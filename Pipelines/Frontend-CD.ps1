# Frontend-CD.ps1
Write-Host "=== Frontend-CD.ps1 started ==="

# Read env vars
$resourceGroup   = $env:RESOURCE_GROUP
$appService      = $env:APP_SERVICE
$acrName         = $env:ACR_NAME
$imageName       = $env:IMAGE_NAME
$imageTag        = $env:IMAGE_TAG
$acrUser         = $env:ACR_USER
$acrPwd          = $env:ACR_PWD
$acrLoginServer  = $env:ACR_LOGIN_SERVER

if (-not $resourceGroup -or -not $appService -or -not $acrLoginServer -or -not $imageName -or -not $imageTag) {
    Write-Error "One or more required environment variables are missing. Ensure RESOURCE_GROUP, APP_SERVICE, ACR_LOGIN_SERVER, IMAGE_NAME and IMAGE_TAG are set."
    exit 1
}

Write-Host ("ResourceGroup: {0}" -f $resourceGroup)
Write-Host ("AppService:    {0}" -f $appService)
Write-Host ("ACR Login:     {0}" -f $acrLoginServer)
Write-Host ("Image:         {0}:{1}" -f $imageName, $imageTag)

# Build full image path safely
$fullImage = "$($acrLoginServer)/$($imageName):$($imageTag)"
Write-Host ("Full image path: {0}" -f $fullImage)

# Update App Service container settings to point to the new image and registry credentials
Write-Host "Updating App Service container configuration..."
try {
    az webapp config container set `
        --name $appService `
        --resource-group $resourceGroup `
        --docker-custom-image-name $fullImage `
        --docker-registry-server-url "https://$acrLoginServer" `
        --docker-registry-server-user $acrUser `
        --docker-registry-server-password $acrPwd | Out-Null
} catch {
    Write-Error "Failed to set container config on App Service: $_"
    exit 1
}

# Restart App Service to pull the new image
Write-Host "Restarting App Service..."
try {
    az webapp restart --name $appService --resource-group $resourceGroup | Out-Null
} catch {
    Write-Error "Failed to restart App Service: $_"
    exit 1
}

Write-Host " Frontend successfully deployed: $fullImage -> $appService"
Write-Host "=== Frontend-CD.ps1 finished ==="
