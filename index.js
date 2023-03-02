// require('./config/db')
// import  db from './config/db'
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'
import { register } from "./controllers/auth.js";
import {createPost} from "./controllers/post.js"
import { verifyToken } from "./middleware/auth.js";
import { create } from "domain";

// Configurations_____________________________
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage____________________________
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "piblic/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routes with files
app.post("/auth/register",upload.single("picture"), register)
app.post("/post", upload.single("picture"),createPost)
app.get("/auth/register",(req,res)=>{
  res.send("hello")
})
// Routes
app.use("/auth",authRoutes)
app.use("/users",userRoutes)
app.use("/post",postRoutes)




// Port
const PORT=process.env.PORT || 6000
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT, ()=>console.log(`Server Port: ${PORT}`))
}).catch((error)=>console.log(`${error}did not connect`))

// Mongoose Setuo___________________________

// const userRoutes=require('./routes/user')
// const authRoutes=require('./routes/auth')

// app.use('/api/users',userRoutes)
// app.use('/api/auth',authRoutes)


