# ==============================
# PowerShell Script: Deploy Docker image from ACR to App Service
# ==============================

Write-Host "Starting deployment..."

# Variables (same as in YAML)
$resourceGroup = "rg-banking-app"
$appServiceName = "frontend-appservice"
$acrName = "bankingacr"
$imageName = "frontend-ci"

# This assumes the pipeline provides a runId variable
$imageTag = "v$(resources.pipeline.frontend-ci.runId)"

# Full image name
$imageFullName = "$acrName.azurecr.io/$imageName:$imageTag"
Write-Host "Using image: $imageFullName"

# Check if App Service exists
$app = az webapp show --resource-group $resourceGroup --name $appServiceName --output none 2>$null


Write-Host "App Service exists. Updating container image..."
az webapp config container set `
    --name $appServiceName `
    --resource-group $resourceGroup `
    --docker-custom-image-name $imageFullName `
    --docker-registry-server-url "https://$acrName.azurecr.io"


# Restart the app to apply changes
Write-Host "Restarting the app..."
az webapp restart --name $appServiceName --resource-group $resourceGroup

Write-Host "Deployment completed successfully!"
