const mongoose = require('mongoose')

//Connection
async function connectMondgoDb(url) {
    return (
        mongoose.connect(url)
.then(()=>console.log("mongoDB connected"))
.catch(err => console.log('mongo error', err))
    )

}

module.exports = {
    connectMondgoDb,
};