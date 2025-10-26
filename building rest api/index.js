const express = require('express');
const fs = require('fs')
const mongoose = require('mongoose')
// const users = require("./MOCK_DATA.json");
const { json } = require('stream/consumers');

const app = express();
const PORT = 8000;

//Connection of Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/myapp-1')
.then(()=>console.log("mongoDB connected"))
.catch(err => console.log('mongo error', err))

//Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    },
    gender:{
        type: String
    }
});

const User = mongoose.model("user", userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false}));

// app.use((req, res, next) => {
//     console.log("hello from middleware function 1");
//     next();
//     return res.json({msg: "hello from middleware 1"}); // user won't get to the later code
// });

app.use((req, res, next) => {
    fs.appendFile("log.txt",`${Date.now()} : ${req.method}: ${req.path}`,
    (err,data) => {
        next();
    });

});

app.use(express.json())

//Routes 
app.get("/users", async (req,res) => {
    const allDbusers = await User.find({});
    const html = `
    <ul>
    ${allDbusers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>`
    return res.send(html);
})

//REST API ROUTES
app.get("/api/users", (req,res) => {
    return res.json(users);
});

app.get("/api/users/:id", async(req, res) => {
    const id = Number(req.params.id);
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({error: "user not found"});
    }
    return res.json(user);
});

app.post("/api/users", async (req,res) => {
    //TODO CREATE NEW USER
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.job || !body.gender){
        return res.status(400),json({msg: "all fields are required*"})
    }
    // users.push({...body, id: users.length + 1});
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) =>{
    //     return res.status(201).json({status: "success", id: users.length + 1});
    // });
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job
    });
    console.log('result: ', result);
    return res.status(201).json({msg: "success"});
});


app.delete("/api/users/:id", (req,res) =>{
    const id = Number(req.params.id);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({error: "user not found"});

    users.splice(idx,1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err, data) => {
        return res.json({ status: "success", id});
    })
})

app.patch("/api/users/:id", (req,res) => {
    const id = Number(req.params.id);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({error: "user not found"});

    const updates = req.body || {};
    const allowed = ['first_name', 'last_name', 'email', 'gender', 'job'];
    const user = users[idx];

    Object.keys(updates).forEach(key => {
        if (allowed.includes(key)) user[key] = updates[key];
    });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err, data) =>{
        if (err) {
            console.error(err);
            return res.status(500).json({error: "could not persits data"});
        }
        return res.json({status: "success", user});
    })
})

// WE CAN SEE app.get, app.post, app.patch, app.delete have same path "/api/users/:id"
// so we can use app.route() to combine them

app.route("/api/users/:id")
    .get(async (req,res) => {
    const user = await User.findIndex(req.params.id)
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user);
    })
    // .patch((req,res) => {
    //     //TODO EDIT THE USER WITH ID = id
    //     return res.json({status: "pending"})
    // })
    // .delete((req,res) => {
    //     //TODO DELETE THE USER WITH ID = id
    //     return res.json({status: "pending"})
    // });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
