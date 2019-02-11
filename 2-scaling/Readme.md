# Horizontal Partitioning
In first example (1-Single db and multiple instances) we use just clustering (x axis scaling). The second example includes also sharding (z axis scaling).

## Routes
* Get All Items - GET http://127.0.0.1:3000/
* Add Item - POST http://127.0.0.1:3000/
* Get Item - GET http://127.0.0.1:3000/:name
* Update Item -PATCH http://127.0.0.1:3000/:name
* Delete Item -DELETE http://127.0.0.1:3000/:name

### Get All Items
```curl
curl -X GET http://127.0.0.1:3000
```

### Add item
```curl
curl -X POST \
  http://127.0.0.1:3000 \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "Water Melon",
	"color": "Green"
}'
```

### Get item
```curl
curl -X GET http://127.0.0.1:3000/Apple
```

### Update item
```curl
curl -X PATCH \
  http://127.0.0.1:3000/Apple \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Apple",
    "color": "Red"
}'
```

### Delete item
```
curl -X DELETE http://127.0.0.1:3000/Apple
```