$ErrorActionPreference = "Stop"

function Log($message) {
    Write-Host $message
    Start-Sleep -Milliseconds 100
}

# Args
$ACR_NAME = $args[0]
$IMAGE_NAME = $args[1]
$DOCKERFILE_PATH = $args[2]
$IMAGE_TAG = $args[3]

# Read backend URL from .env file
# $envFilePath = "$(Build.SourcesDirectory)\.env"
# $backendUrl = (Get-Content $envFilePath | Select-String "VITE_API_BASE_URL").ToString().Split("=")[1].Trim()

Log "Backend URL detected: $backendUrl"

Log "Logging into ACR..."
az acr login --name $ACR_NAME

Log "Building Docker image..."
docker build `
  --build-arg VITE_API_BASE_URL=$backendUrl `
  -t "${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}" `
  -f $DOCKERFILE_PATH .

Log "Pushing Docker image..."
docker push "${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}"

Log "Frontend CI build completed successfully!"
