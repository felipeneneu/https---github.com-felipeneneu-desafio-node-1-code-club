const express = require('express')
const uuid = require('uuid')

const app = express()
app.use(express.json())



const port = 3000

const orders = []

const checkUserId = (request, response, next) => {
    const { id } = request.params


    const filters = orders.findIndex(filtro => filtro.id === id)


    if (filters < 0) {
        return response.status(404).json({ message: "user not found" })
    }

    const index = orders.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "user not found" })
    }

    request.userIndex = index
    request.userId = id
    request.achaFilter = filters

    next()
}

app.get('/orders', (request, response) => {
    return response.json(orders)
})

app.post('/orders', (request, response) => {

    const { order, clienteName, price, status } = request.body

    const user = { id: uuid.v4(), order, clienteName, price, status }

    orders.push(user)

    return response.status(201).json(user)
})

app.put('/orders/:id', checkUserId, (request, response) => {

    const { price, status } = request.body
    const index = request.userIndex
    const id = request.userId
    const upadateUsers = { id, price, status }


    orders[index] = upadateUsers
    console.log(index)

    return response.json(upadateUsers)
})

app.delete('/orders/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    orders.splice(index, 1)
    return response.status(204).json()
})

app.get('/orders/:id', checkUserId, (request, response) => {

    const { order, clienteName, price, status } = request.body
    const filters = request.achaFilter
    const id = request.userId
    const findResult = { id, order, clienteName, price, status }
    orders[filters] = findResult


    return response.json(findResult)
})

app.listen(port, () => {
    console.log(`Server started on port ${port} 🚀`)
})