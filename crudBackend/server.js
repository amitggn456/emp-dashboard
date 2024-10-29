const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors');
app.use(cors());

const PORT = 8080;

app.get('/', (req, resp) => {
    resp.send("data get bt get method");
});


app.use(express.json())  // middleware


//connection part design
mongoose.connect('mongodb://127.0.0.1:27017/merncrud')
    .then(() => console.log('Connected!'))
    .catch((err) => console.log("error page"))



//user Schema

const userSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        require: [true, ""]
    },
    age: {
        type: Number,
        require: true
    },
    exprience: {
        type: String
    },
    salary: {
        type: Number
    }
}, { timestamps: true }
);

//model
const User = mongoose.model('employeedata', userSchema)

app.post('/createemployee', async (req, resp) => {
    try {
        const bodyData = req.body;
        const employee = new User(bodyData)
        const userData = await employee.save()
        resp.send(userData)
    } catch (error) {
        resp.send(error)
    }

})

//read allemployee data
app.get('/readallemployee', async (req, resp) => {
    try {
        const userData = await User.find({})
        resp.send(userData)
    } catch (error) {
        console.log(error)
    }
})


//get single employee data
app.get('/singleread/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const user = await User.findById({
            _id: id
        })
        resp.send(user);

    } catch (error) {
        console.log(error)
    }
})


//update employee 

app.put('/updateemp/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        resp.send(user)
    } catch (error) {
        console.log(error)
    }
})


//create delete api


app.delete('/deleteemp/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({ _id: id })
        resp.send(user)
    } catch (error) {
        console.log("error")
    }
})



app.listen(PORT, (req, resp) => {
    console.log("my server is running on port no 8080")
})