import express from 'express';
import ip from 'ip';
import mongoose from 'mongoose';
import { studentRoute } from './router/managment.js';
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors())



const URLL =`mongodb+srv://faaiz:faaizalam@cluster0.hyszg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(URLL).then(()=>{
   console.log('been conntecd');
}).catch((error)=>{
   console.log(error)

})

let port = process.env.PORT || 3000;
app.use("/",studentRoute)


const localIP = ip.address(); // Get local IP address

app.listen(port, () => { // Corrected host to "0.0.0.0"
  console.log(`Server running at http://localhost:3000$:${port}`);
});
