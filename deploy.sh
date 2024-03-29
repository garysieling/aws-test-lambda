set -e
set -o xtrace

npm install

zip -r lambda.zip .
 
aws lambda create-function \
  --function-name test-lambda \
  --zip-file fileb://lambda.zip \
  --runtime 'nodejs10.x' \
  --handler 'index.handler' \
  $@
