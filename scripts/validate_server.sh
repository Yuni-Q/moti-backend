echo '======================='
echo 'Running validate_server'
echo '======================='

sleep 60
result=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/health)

echo Check http://localhost:8000/health
echo $result

if [[ "$result" =~ "200" ]]; then
  exit 0
else
  exit 1
fi