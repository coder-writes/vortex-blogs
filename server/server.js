import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import adminController from './controllers/adminController.js';
import blogRouter from './routes/blogRoutes.js';
import appRouter from './routes/appRoutes.js';


const app = express();


await connectDB();

console.log(process.env.ADMIN_EMAIL);
console.log(process.env.ADMIN_PASSWORD);

app.use(cors());
app.use(express.json());


app.get('/', (req,res)=>res.send("API IS WORKING"));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api', appRouter);

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
    console.log(`The Server is running on the port http://localhost:${PORT}`);
})