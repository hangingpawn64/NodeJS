const express = require('express');
const fs = require('fs')
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;


// Middleware - Plugin
app.use(express.urlencoded({ extended: false}));
app.use(express.json())

//Routes 
app.get("/users", (req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>`
    return res.send(html);
})

//REST API ROUTES
app.get("/api/users", (req,res) => {
    return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user){
        return res.status(404);
    }
    return res.json(user);
});

app.post("/api/users", (req,res) => {
    //TODO CREATE NEW USER
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) =>{
        return res.json({status: "success", id: users.length + 1});
    });
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
    .get((req,res) => {
        //TODO GET THE USER WITH ID = id
        return res.json({status: "pending"})
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
