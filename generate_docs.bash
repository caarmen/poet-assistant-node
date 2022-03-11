curl http://localhost:3000/api-spec/v3/ > docs/openapi-schema.yml
openapi-generator generate -i docs/openapi-schema.yml -g html2 -o docs
