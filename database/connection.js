const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb')
const CONNECTION_STRING = "mongodb+srv://antoine:luisMX1603@cluster0.tbfypms.mongodb.net/"

var db = null

const client = new MongoClient(CONNECTION_STRING)

try {
    client.connect()
    db = client.db("employeesdb")
    console.log("MongoDB Connection Success...")
} catch (error) {
    console.log(error)
}

module.exports = db

