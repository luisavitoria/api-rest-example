import express, { response } from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express()
const PORT = process.env.PORT || 3000

let users = [
    { id: 1, name: 'Luisa Vitoria', age: 26 },
    { id: 2, name: 'Carlos Alberto', age: 24 }
]

app.use(express.json()) //requisição será um objeto json

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor express</h1>')
})

//criando as rotas

//rota lista de usuarios
app.get('/users', (request, response) => {
    return response.send(users)
})

//rota usuario especifico
app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId
    const user = users.find(user => {
        return (user.id === Number(userId)) //retorna o primeiro elemento que satisfaz a condição
    })
    return response.send(user)
})

//adicionando novo usuario
app.post('/users', (request, response) => {
    const newUser = request.body

    users.push(newUser)

    return response.status(StatusCodes.CREATED).send(newUser) //criar usuario - retornar codigo 201
})

//atualizando usuario
app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId
    const updateUser = request.body

    users = users.map(user => {
        if(user.id === Number(userId)) {
            return updateUser
        }
        return user
    })

    return response.send(updateUser)
})

//removendo um usuario
app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId

    users = users.filter((user) => user.id !== Number(userId))

    return response.status(StatusCodes.NO_CONTENT).send()
})