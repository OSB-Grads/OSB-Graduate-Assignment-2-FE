# Hardcode or use environment variables passed from the pipeline
$ResourceGroup = $env:RESOURCE_GROUP
$AppName = $env:APP_NAME
$AcrName = $env:ACR_NAME
$ImageName = $env:IMAGE_NAME
$ImageTag = $env:IMAGE_TAG

Write-Host "Starting deployment..."
Write-Host "Resource Group: $ResourceGroup"
Write-Host "App Name: $AppName"
Write-Host "ACR: $AcrName"
Write-Host "Image: $ImageName:$ImageTag"

# Login to ACR
Write-Host "Logging into Azure Container Registry..."
az acr login --name ($AcrName.Split('.')[0])

# Build full image path
$FullImage = "$AcrName/$ImageName:$ImageTag"

# Update the App Service to use the new image
Write-Host "Updating App Service container configuration..."
az webapp config container set `
    --name $AppName `
    --resource-group $ResourceGroup `
    --docker-custom-image-name $FullImage `
    --docker-registry-server-url "https://$AcrName"

# Restart App Service to apply changes
Write-Host "Restarting App Service..."
az webapp restart `
    --name $AppName `
    --resource-group $ResourceGroup

Write-Host "Deployment completed successfully!"
