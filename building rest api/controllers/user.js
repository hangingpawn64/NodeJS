const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbusers = await User.find({});
    return res.json(allDbusers);
} 

async function getUserById(req, res) {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user);
} 

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
    return res.json({status: "success"});
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"});
}

async function createUserById(req, res){
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
    return res.status(201).json({msg: "success", id: result._id});
}

module.exports = {
    handleGetAllUsers,
    getUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    createUserById,
}