const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');
const connectDB = require('./config/db');

const port = process.env.PORT || 1001;

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database connection
connectDB();

/* DEPRICATED MONGODB CONNECTION
//db config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`mongodb connected`))
  .catch((err) => console.log(err));
  */

app.get('/', (req, res) => res.send('Hello'));

//use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

app.listen(port, () => console.log(`Server on running ${port}`));
