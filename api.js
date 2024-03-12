const express = require('express')
const employeeRoutes = require('../routes/employeesRoutes.js')
const app = express()
const port = 3000
//con esta extencion cuando hagamos peticiones tipo post podamos enviar una cadena json

app.use(express.json())
app.use('/', employeeRoutes)
app.listen(port, async () => { 
    console.log(`Example app listening on port ${port}!`)
})

