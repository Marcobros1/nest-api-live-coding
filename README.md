## Conexión a bbdd pg en contenedor local

docker exec -it postgres-sql psql -U admin_library -d library -c "CREATE DATABASE library;"

## Volcar sql en la bbdd

docker exec -i postgres-sql psql -U admin_library -d library < database/schema.sql
