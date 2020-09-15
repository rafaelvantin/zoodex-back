const mongoose = require("mongoose");

try {
  mongoose.connect(`${process.env.MONGO_URL}ZooBauru`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  mongoose.Promise = global.Promise;

  const db = mongoose.connection;
} catch (erro) {
  console.log(erro);
}

module.exports = mongoose;
