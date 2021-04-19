echo '======================='
echo 'Running validate_server'
echo '======================='

sleep 3
result=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/)

echo Check http://localhost:8000/
echo $result

if [[ "$result" =~ "200" ]]; then
  exit 0
else
  exit 1
fi