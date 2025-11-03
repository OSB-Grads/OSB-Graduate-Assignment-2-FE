# =====================================================================
# Deploy-To-AppService.ps1
# Updates an existing Azure App Service (Linux) to use a new container image from ACR.
# Expects 5 arguments in order:
#   1. Resource Group
#   2. App Service Name
#   3. ACR Name (short or full login server)
#   4. Image Name
#   5. Image Tag
# =====================================================================

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# -------------------------------
# Read arguments (in order)
# -------------------------------
$resourceGroup   = $args[0]
$appServiceName  = $args[1]
$acrName         = $args[2]
$imageName       = $args[3]
$imageTag        = $args[4]

# -------------------------------
# Log configuration
# -------------------------------
Write-Host "==============================================================="
Write-Host "Starting App Service container deployment..."
Write-Host "Resource Group : $resourceGroup"
Write-Host "App Service    : $appServiceName"
Write-Host "ACR (Input)    : $acrName"
Write-Host "Image Name     : $imageName"
Write-Host "Image Tag      : $imageTag"
Write-Host "==============================================================="

# -------------------------------
# Resolve ACR login server
# -------------------------------
if ($acrName -match "\.") {
    $acrLoginServer = $acrName
} else {
    $acrLoginServer = "$($acrName).azurecr.io"
}

$imageFull = "$acrLoginServer/$imageName:$imageTag"
Write-Host "Resolved ACR Login Server : $acrLoginServer"
Write-Host "Full Container Image      : $imageFull"
Write-Host "---------------------------------------------------------------"

# -------------------------------
# Configure App Service container
# -------------------------------
Write-Host "Configuring App Service container settings..."
$azCmdStatus = & az webapp config container set `
    --name $appServiceName `
    --resource-group $resourceGroup `
    --docker-custom-image-name $imageFull `
    --docker-registry-server-url "https://$acrLoginServer" `
    --output none 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to update container settings. Exit Code: $LASTEXITCODE"
    Write-Error $azCmdStatus
    exit $LASTEXITCODE
}

# -------------------------------
# Restart the App Service
# -------------------------------
Write-Host "Restarting App Service '$appServiceName'..."
& az webapp restart --name $appServiceName --resource-group $resourceGroup --output none

if ($LASTEXITCODE -ne 0) {
    Write-Warning "Restart returned non-zero exit code ($LASTEXITCODE). Continuing..."
}

# -------------------------------
# Verify container configuration
# -------------------------------
Write-Host "Fetching current container configuration..."
& az webapp config container show `
    --name $appServiceName `
    --resource-group $resourceGroup `
    --output table

Write-Host "---------------------------------------------------------------"
Write-Host "App Settings (filtered for DOCKER / WEBSITES keys):"
& az webapp config appsettings list `
    --name $appServiceName `
    --resource-group $resourceGroup `
    --query "[?starts_with(name, 'DOCKER') || starts_with(name, 'WEBSITES_')].{name:name,value:value}" `
    --output table

Write-Host "---------------------------------------------------------------"
Write-Host " Deployment completed successfully."
Write-Host "==============================================================="
