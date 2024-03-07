#!/bin/bash
# Set the pipefail option.
set -o pipefail

GET_DEPLOYMENTS_ENDPOINT="https://api.vercel.com/v6/deployments"
DELETE_DEPLOYMENTS_ENDPOINT="https://api.vercel.com/v13/deployments"

deployments=$(curl -s -X GET "$GET_DEPLOYMENTS_ENDPOINT/?projectId=$VERCEL_PROJECT_ID&teamId=$VERCEL_ORG_ID&target=production" -H "Authorization: Bearer $VERCEL_TOKEN ")

NEW_PROD_URL=$(echo "$NEW_PROD_URL" | sed 's/^https\?:\/\///')
filtered_deployments=$(echo $deployments | jq --arg NEW_PROD_URL "$NEW_PROD_URL" '[.deployments[] | select(.url != $NEW_PROD_URL) | .uid] | join(",")')
filtered_deployments="${filtered_deployments//\"/}"

# Clears the values from filtered_deployments
IFS=',' read -ra values <<<"$filtered_deployments"

echo "NEW_PROD_URL: ${NEW_PROD_URL}"
echo "Filtered deployments ${filtered_deployments}"

# Iterate over the filtered deployments list.
for uid in "${values[@]}"; do
    echo "Deleting ${uid}"

    delete_url=${DELETE_DEPLOYMENTS_ENDPOINT}/${uid}?teamId=${VERCEL_ORG_ID}
    echo $delete_url

    # Make DELETE a request to the /v13/deployments/{id} endpoint.
    curl -X DELETE $delete_url -H "Authorization: Bearer $VERCEL_TOKEN"

    echo "Deleted!"
done