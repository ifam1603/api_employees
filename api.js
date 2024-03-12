const express = require('express')
const employeesRoutes = require('./routes/employeesRoutes')
const app = express()
const port = 3000
app.use(express.json())
app.use('/', employeesRoutes)
//app.use(require('./routes/employeesRoutes'))
app.listen(port, async () => { 
    console.log(`Example app listening on port ${port}!`)
})

