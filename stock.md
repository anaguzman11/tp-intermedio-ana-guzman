Mongo

Productos
\_id
name
categoria ref -> doc de categoria
stock
descripcion
price
createAt
updateAt

Categorias
\_id
name

CRUD tanto de Productos como de Categorias

modelo >> servicio >> controller >> router >> index
|| || || ||
(q usa) (q usa) (q usa) (middlewares)

index >> router >> controller >> servicio >> modelo

- index: punto de entrada
- router: agrupa las rutas de un mismo conjunto de apis
  controller: son los encargados de manejar los errores/respuestas exitosas, en casos complejos tambien centralizan los servicios si es que hay mas de uno.
  services: la logica de lo que vamos a necesitar hacer
  modelo: el encargado de hablar con la base de datos

get /api/producto todos los productos
get /api/producto/:id trae un producto
post /api/producto cargo un producto
put /api/producto actualizo un producto
delete /api/producto/:id elimino un producto

get /api/categoria todos los categorias
get /api/categoria/:id trae una categoria
post /api/categoria cargo un categoria
put /api/categoria actualizo un categoria
delete /api/categoria/:id elimino un categoria

curl http://localhost:3000/api/categoria

curl http://localhost:3000/api/categoria/6969868862b4bef89b9e671a

curl -X POST http://localhost:3000/api/categoria -H "Content-Type: application/json" -d '{"name": "Nueva Categoria"}'

curl -X PUT http://localhost:3000/api/categoria/6969868862b4bef89b9e671a -H "Content-Type: application/json" -d '{"name": "Categoria Actualizada"}'

curl -X DELETE http://localhost:3000/api/categoria/6969868862b4bef89b9e671a

que hace falta??? validaciones!!!!

despues como plus podemos ver de usar el middleware authorize para bloquear las rutas create, update & delete

curl http://localhost:3000/api/producto

curl http://localhost:3000/api/producto/697016f417d05a0e5405c4ec

curl -X POST http://localhost:3000/api/producto -H "Content-Type: application/json" -d '{"name":"Producto Ejemplo", "description" : "el mejor producto del mundo", "price" : 999.99, "stock" : 1, "categoryId" : "696986dd62b4bef89b9e6720"}'

curl -X PUT http://localhost:3000/api/producto/69701df701c30afa1a593cf2 -H "Content-Type: application/json" -d '{"name":"Producto Actualizado"}'

curl -X DELETE http://localhost:3000/api/producto/69701df701c30afa1a593cf2
