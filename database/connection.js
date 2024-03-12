const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb')
const CONNECTION_STRING ="mongodb+srv://antoine:luisMX1603@cluster0.tbfypms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

var db = null


const client = new MongoClient(CONNECTION_STRING)

try{
    //aqui llamamos al metodo connect para poder conectar con la base de datos
    client.connect()
    //apartir de axqui podemos utilizar la variable db para hacer consulas a la base de datos 
    db =  client.db("employeesdb")
    console.log("MOngoDB conecction succesfully...")
}
catch(error){
    console.log(error)
}

module.exports = db

