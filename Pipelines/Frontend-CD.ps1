# Pipelines/Frontend-CD.ps1
# This script reads configuration from environment variables (no param() block).
# Required environment variables set by the pipeline:
#   RESOURCE_GROUP, APP_SERVICE, ACR_NAME, IMAGE_NAME, IMAGE_TAG
# The pipeline runs this script through AzureCLI@2 so az is authenticated.

Write-Host "=== Frontend-CD.ps1 started ==="

# Read env vars
$resourceGroup = $env:RESOURCE_GROUP
$appService    = $env:APP_SERVICE
$acrName       = $env:ACR_NAME
$imageName     = $env:IMAGE_NAME
$imageTag      = $env:IMAGE_TAG

if (-not $resourceGroup -or -not $appService -or -not $acrName -or -not $imageName -or -not $imageTag) {
    Write-Error "One or more required environment variables are missing. Ensure RESOURCE_GROUP, APP_SERVICE, ACR_NAME, IMAGE_NAME and IMAGE_TAG are set."
    exit 1
}

Write-Host "ResourceGroup: $resourceGroup"
Write-Host "AppService:  $appService"
Write-Host "ACR Name:    $acrName"
Write-Host "Image:       $imageName:$imageTag"

# Determine ACR login server (handle either full login server or short name)
if ($acrName -match "\.") {
    $acrLoginServer = $acrName
} else {
    $acrLoginServer = "$acrName.azurecr.io"
}
Write-Host "ACR login server: $acrLoginServer"

# Get ACR credentials (username & password)
Write-Host "Retrieving ACR credentials..."
try {
    $acrUser = az acr credential show --name $acrName --query "username" -o tsv
    $acrPwd  = az acr credential show --name $acrName --query "passwords[0].value" -o tsv
} catch {
    Write-Error "Failed to get ACR credentials: $_"
    exit 1
}

if (-not $acrUser -or -not $acrPwd) {
    Write-Error "ACR credentials were empty. Ensure the service principal used by the pipeline has permission to read ACR credentials."
    exit 1
}

$fullImage = "$acrLoginServer/$imageName:$imageTag"
Write-Host "Full image path: $fullImage"

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
