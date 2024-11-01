const express = require('express')
const recipes = [
    { id: 1, name: 'Lasanha', description: 'Monte camadas de massa de lasanha com molho de carne moída refogada, molho bechamel e queijo. Comece com uma camada de molho e finalize com queijo. Asse no forno até que a lasanha esteja dourada e borbulhante.' },
    { id: 2, name: 'Risoto', description: 'Refogue cebola e alho em azeite, adicione arroz arbóreo e cozinhe um pouco antes de começar a adicionar caldo de legumes quente, uma concha por vez. Mexa constantemente até que o arroz absorva o líquido e adicione parmesão para finalizar.' },
    { id: 3, name: 'Estrogonofe', description: 'Corte o frango em tiras e refogue em uma panela com alho e cebola. Acrescente creme de leite, molho de tomate e mostarda. Deixe cozinhar em fogo baixo até o molho engrossar e o frango estar bem cozido.' },
    { id: 4, name: 'Panqueca', description: 'Misture leite, farinha e ovos para fazer uma massa leve. Aqueça uma frigideira untada e despeje uma pequena quantidade da massa, espalhando bem. Cozinhe dos dois lados e sirva com recheio de carne ou frango e molho de tomate por cima.'},
    { id: 5, name: 'Brigadeiro', description: 'Em uma panela, misture leite condensado, manteiga e chocolate em pó. Cozinhe em fogo baixo, mexendo até a mistura soltar do fundo. Espere esfriar e enrole em pequenas bolinhas, passando-as no granulado.'},
    { id: 6, name: 'Quiche', description: 'Faça uma massa com farinha, manteiga e água gelada e leve ao forno para assar parcialmente. Recheie com um creme feito de ovos e creme de leite, e adicione ingredientes como queijo, bacon ou espinafre. Asse até que o recheio esteja firme.'},
    { id: 7, name: 'Empadão', description: 'Faça uma massa com farinha, manteiga e água e use-a para forrar uma forma. Recheie com frango desfiado refogado com temperos e cubra com mais massa. Pincele com gema e asse até dourar.'},
]

const app = express()
app.use(express.json())

// Rota para listar todas as receitas ou filtrar por nome
app.get('/recipes', (req, res) => {
    if (req.query.name) {
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(req.query.name.toLowerCase())
        )
        return res.json(filteredRecipes)
    }
    return res.json(recipes)
})

// Rota para listar uma receita específica por ID
app.get('/recipes/:id', (req, res) => {
    const { id } = req.params
    const recipe = recipes.find(r => r.id == id)
    if (recipe) {
        res.json(recipe)
    } else {
        res.status(404).json({ message: "Receita não encontrada" })
    }
})

// Rota para adicionar uma nova receita
app.post('/recipes', (req, res) => {
    const { name, description } = req.body
    if (!name || !description) {
        return res.status(422).json({ message: "Nome e descrição são obrigatórios" })
    }
    const newRecipe = {
        id: recipes.length > 0 ? recipes.at(-1).id + 1 : 1,
        name,
        description
    }
    recipes.push(newRecipe)
    res.status(201).json(newRecipe)
})

// Rota para atualizar uma receita existente
app.put('/recipes/:id', (req, res) => {
    const { id } = req.params
    const { name, description } = req.body
    const recipe = recipes.find(r => r.id == id)
    
    if (!recipe) {
        return res.status(404).json({ message: "Receita não encontrada" })
    }
    if (!name || !description) {
        return res.status(422).json({ message: "Nome e descrição são obrigatórios" })
    }
    
    recipe.name = name
    recipe.description = description
    res.json(recipe)
})

// Rota para deletar uma receita
app.delete('/recipes/:id', (req, res) => {
    const { id } = req.params
    const recipeIndex = recipes.findIndex(r => r.id == id)
    
    if (recipeIndex === -1) {
        return res.status(404).json({ message: "Receita não encontrada" })
    }
    
    recipes.splice(recipeIndex, 1)
    res.json({ message: "Receita deletada com sucesso" })
})

// Inicializa o servidor
app.listen(4000, () => {
    console.log("Servidor de receitas rodando em: http://localhost:4000")
})
