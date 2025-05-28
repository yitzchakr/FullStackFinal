require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = 3000;
const requestRouter = require('./routes/requests');
const cors = require('cors');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
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
app.use('/admin', adminRouter);




app.use(errorHandler)
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`)
)






