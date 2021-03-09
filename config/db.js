const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

const connectDB = async () => {
  // console.log('DEBUG: ' + db.substring(1,15));
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB Connected');
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}
module.exports = connectDB;