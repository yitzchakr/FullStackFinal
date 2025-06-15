require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = 3000;
const requestRouter = require('./routes/requests');
const cors = require('cors');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const managerRouter = require('./routes/manager');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));
app.use("/auth",authRouter);
app.use("/requests",requestRouter);
app.use('/users', adminRouter);
app.use('/manager', managerRouter);



app.use(errorHandler)
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`)
)






