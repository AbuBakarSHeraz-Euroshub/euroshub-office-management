const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
const authRoutes = require('./routes/auth/auth');
const boardRoutes = require('./routes/baord/board');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
connectDB();

app.get('/',(req,res)=>{
    res.json({message :'Hello from server'});
    console.log('Server is running');
})
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});

app.use('/api/auth', authRoutes);
app.use('/api/board' , boardRoutes);




