import express from 'express';
import ip from 'ip';
import mongoose from 'mongoose';
import { studentRoute } from './router/managment.js';

const app = express();
app.use(express.json());

// Correct MongoDB connection string
let username="faaiz"
let password="karachipakistan"
const URLL =`mongodb+srv://faaiz:faaizalam@cluster0.hyszg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(URLL).then(()=>{
   console.log('been conntecd');
}).catch((error)=>{
   console.log(error)

})

let port = process.env.PORT || 3000;
app.use("/",studentRoute)
app.get("/", (req, res) => {
  res.send(`Check out this product http://localhost:3000/share/product/2`);
});

const localIP = ip.address(); // Get local IP address

app.listen(port, "0.0.0.0", () => { // Corrected host to "0.0.0.0"
  console.log(`Server running at http://${localIP}:${port}`);
});
