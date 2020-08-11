const mongoose = require('mongoose');
try{
mongoose.connect('mongodb+srv://duduzinho:123@cluster0.qwazs.mongodb.net/ZooBauru?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;


const db = mongoose.connection;
}
catch(erro)
{
    console.log(erro);
}
module.exports = mongoose;