const express = require('express')
const db = require('../database/connection')
const router = express.Router()


router.get('/employees',async (req, res) => {

    //consultamos los empleados de la bd
    //usando el await esperara a que conteste la solicitud para seguir, y tenmos que usar el async 
    const employees = await db.collection('employees').find().toArray()

    employees.forEach(element => {
        console.log(element)
    });

  res.send(employees)
})

//SERVICION PARA BUSCAR UN EMPLEADO POR SU NO_EMP
router.get('/employees/:no_emp',async (req, res) => {

    //para acceder al parametro debemos usar el objeto req.params
    const employees = await db.collection('employees').find({"no_emp":parseInt(req.params.no_emp)}).toArray()

  res.send(employees)
})

//SERVICIO PRA BUSCAR UN EMPLEADO GENRE Y DEPARTAMENTO
router.get('/employees/old/:old',async (req, res) => {
    const employees = await db.collection('employees')
                      .find({"_id":new ObjectId(req.params.old)})
                      .toArray()
  res.send(employees)
})

router.get('/employees/gender/:gender/department/:department',async (req, res) => {

    //para acceder al parametro debemos usar el objeto req.params
    const employees = await db.collection('employees').
                      find({"gender":req.params.gender,
                            "department":req.params.department})
                      .toArray()

  res.send(employees)
})

//INSERTAR EMPLEADOS
router.post('/employees',async function (req, res) {

    const newEmployees = {
        "emp_no": getRandomArbitrary(1500,10000),
        "first_name": req.body.first_name,
        "last_name":req.body.last_name,
        "email":req.body.email,
        "salary":req.body.salary,
        "gender":req.body.gender,
        "hire_date":req.body.hire_date,
        "department":req.body.department
    }

    const result =await db.collection("employees").insertOne(newEmployees)
  res.send(result),de
})

function getRandomArbitrary(min,max){
    return Math.random()*(max-min)+min;
}

//ELIMINAR EMPLEADOS 
router.delete('/employees/:emp_no', async (req, res)=>{
    try {
        const result = await db.collection('employees').findOneAndDelete(
            {"emp_no": parseInt(req.params.emp_no)}
        )
        res.send((result)?"Employee deleted...":"Employee not found")
    } catch (error) {
        console.log(error)
    }
})

//ACUTIALIZAR EMPLEADOS
router.put('/employees', async function(req, res) {

    try {
        const empUpdate = db.collection('employees')
        const result = await empUpdate.findOneAndUpdate(
            { "emp_no":parseInt(req.body.emp_no) }, 
            { $set: req.body },
            { returnDocument: 'after', upsert: true }
        )
        res.send(result)
    } catch (error) {
        console.log(error)
    }
});



router.get('/', (req, res) => res.send('Hello World!'))

module.exports = router