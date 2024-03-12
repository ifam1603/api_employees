const express = require('express')
const db = require('../database/connection')

const router = express.Router()

router.get('/employees', async (req, res) => {

    const employees = await db.collection('employees').find().toArray()

    /*employees.forEach(element => {
        console.log(element)
    });*/

    res.send(employees)
})


router.get('/employees/:no_emp', async (req, res) => {
    const employees = await db.collection('employees').find({"no_emp": parseInt(req.params.no_emp)}).toArray()
    res.send(employees)
})

router.get('/employees/oid/:oid', async (req, res) => {
    const employees = await db.collection('employees')
                    .find({"_id": new ObjectId(req.params.oid)})
                    .toArray()
    res.send(employees)
})

router.get('/employees/gender/:gender/department/:depto', async (req, res) => {
    const employees = await db.collection('employees')
                    .find({
                        "gender": req.params.gender, 
                        "department": req.params.depto
                    })
                    .toArray()
    res.send(employees)
})


router.post('/employees', async function (req, res) {

    try {
        /*const newEmployee = {
            "emp_no": getRandomArbitrary(1500, 10000),
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "salary": req.body.salary,
            "gender": req.body.gender,
            "mail": req.body.mail,
            "hire_date": req.body.hire_date,
            "department": req.body.department
        }*/
        const emp = await db.collection('employees')
        const lastEmp = await emp.find().sort({"no_emp":-1}).limit(1).toArray() 
        const no_emp = Math.floor(lastEmp[0].no_emp) + 1;
        const newEmployee = {
            "no_emp" : no_emp,
            ...req.body
        }
    
        const result = await db.collection("employees").insertOne(newEmployee)
        res.send(result)        
    } catch (error) {
        console.log(error)
    }

})

router.put('/employees', async function(req, res) {

    try {
        const empUpdate = db.collection('employees')
        const result = await empUpdate.findOneAndUpdate(
            { "no_emp":parseInt(req.body.no_emp) }, 
            { $set: req.body },
            { returnDocument: 'after', upsert: true }
        )
        res.send(result)
    } catch (error) {
        console.log(error)
    }
});

router.delete('/employees/:no_emp', async (req, res)=>{
    try {
        const result = await db.collection('employees').findOneAndDelete(
            {"no_emp": parseInt(req.params.no_emp)}
        )
        res.send((result)?"Employee deleted...":"Employee not found")
    } catch (error) {
        console.log(error)
    }
})


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
  
router.get('/', (req, res) => res.send('Hello World!'))

module.exports = router