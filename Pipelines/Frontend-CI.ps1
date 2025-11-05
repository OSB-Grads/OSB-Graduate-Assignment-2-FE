$ErrorActionPreference = "Stop"

function Log($message) {
    Write-Host $message
    Start-Sleep -Milliseconds 100
}

# Arguments
$ACR_NAME = $args[0]
$IMAGE_NAME = $args[1]
$DOCKERFILE_PATH = $args[2]
$IMAGE_TAG = $args[3]

Log "Logging into ACR..."
az acr login --name $ACR_NAME

Log "Building Docker image..."
docker build `
  -t "${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}" `
  -f $DOCKERFILE_PATH .

Log "Pushing Docker image..."
docker push "${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}"

Log "Frontend CI build completed successfully!"
