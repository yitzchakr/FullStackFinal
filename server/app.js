const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = 3000;
const requestRouter = require('./routes/requests');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use("/requests",requestRouter);




app.use(errorHandler)
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`)
)






