# Servidor web com NodeJS e Express para receitas culinárias
## Henrique Pieri de Lima

Para executar o código, em um terminal (que já tenha NodeJS e Express intalado), rode a aplicação com o comando: npm run dev


Acesse a URL indicada para ver todas as receitas: http://localhost:4000/recipes
Pode especificar no final dela o id da receita que deseja ver: (http://localhost:4000/recipes/3)
Ou buscar uma receita pelo nome: http://localhost:4000/recipes?name=NOME


Em outro terminal você pode executar os seguintes comandos:

### Para ver todas as receitas:
curl -X GET http://localhost:4000/recipes

### Para ver uma receita especificando seu ID:
(substitui ID)
curl -X GET http://localhost:4000/recipes/ID

### Para adicionar uma nova receita: 
(substitui NOVO NOME, NOVA DESCRIÇÃO e ID)
curl -X POST -H "Content-Type: application/json" -d '{"name": "NOVO NOME", "description": "NOVA DESCRIÇÃO"}' http://localhost:4000/recipes

### Para atualizar uma receita existente:
(substitui NOVO NOME, NOVA DESCRIÇÃO e ID)
curl -X PUT -H "Content-Type: application/json" -d '{"name": "NOVO NOME", "description": "NOVA DESCRIÇÃO"}' http://localhost:4000/recipes/ID

### Para excluir uma receita:
(substitui ID)
curl -X DELETE http://localhost:4000/recipes/ID