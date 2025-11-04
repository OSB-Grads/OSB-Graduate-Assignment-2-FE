# frontend-CD.ps1

$ErrorActionPreference = "Stop"
$ProgressPreference = 'SilentlyContinue'
$WarningPreference = 'Continue'

function Log($msg) {
    $ts = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    Write-Host "[$ts] $msg"
}

# ------------------------------
# Arguments passed from pipeline
# ------------------------------
$RESOURCE_GROUP = $args[0]
$WEBAPP_NAME    = $args[1]
$ACR_NAME       = $args[2]
$IMAGE_NAME     = $args[3]
$IMAGE_TAG      = $args[4]
$BACKEND_URL    = $args[5]   #  new argument

$IMAGE_PATH = "${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}"

Log "-------------------------------------------"
Log "Starting Frontend Deployment"
Log "Resource Group: $RESOURCE_GROUP"
Log "Web App: $WEBAPP_NAME"
Log "Image: $IMAGE_PATH"
Log "Backend API URL: $BACKEND_URL"
Log "-------------------------------------------"

# ------------------------------
# Update App Service container settings
# ------------------------------
Log "Updating App Service to use image: $IMAGE_PATH"

az webapp config container set `
    --name $WEBAPP_NAME `
    --resource-group $RESOURCE_GROUP `
    --docker-custom-image-name $IMAGE_PATH `
    --docker-registry-server-url "https://$ACR_NAME.azurecr.io" `
    --output none

#  Inject backend URL as environment variable for the React app
# Check if backend URL is empty
if ([string]::IsNullOrWhiteSpace($)) {
    throw "ERROR: BACKEND_URL is empty! Cannot set App Service setting."
}

# Log safely
Log "Setting environment variable VITE_API_BASE_URL='$BACKEND_URL'"

# Set the environment variable safely (wrap value in quotes)
az webapp config appsettings set `
    --name $WEBAPP_NAME `
    --resource-group $RESOURCE_GROUP `
    # --settings VITE_API_BASE_URL=$BACKEND_URL `
    --output none

# ------------------------------
# Restart App Service
# ------------------------------
Log "Restarting App Service..."
az webapp restart --name $WEBAPP_NAME --resource-group $RESOURCE_GROUP
Log "App Service restarted successfully."

# ------------------------------
# Verify Deployment
# ------------------------------
Log "Fetching deployment status..."
$state = az webapp show --name $WEBAPP_NAME --resource-group $RESOURCE_GROUP --query "state" -o tsv
Log "App Service State: $state"

Log "Frontend deployment completed successfully!"
Log "-------------------------------------------"
