require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const dbConnect = require("./utils/db");
const errorMiddleware = require("./middlwares/error_middleware");
const contactRoute =  require("./controllers/contact_controller");
const serviceRoute = require("./router/service_route");
const adminRoute = require("./router/admin_router");


//tackle cors policy error
const corsOption = {
   origin:"https://coursehub-mern-frontend.onrender.com",
   methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
   credentials:true
};
app.use(cors(corsOption));

//express middleware
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);
app.use("/api/admin",adminRoute);

// app.get("/",(req,res)=> {
//     res.status(200).send("Hello World");
// });

// app.get("/register",(req,res)=> {
//     res.status(200).send("Hello register");
// });

app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;
dbConnect().then(()=>{
   app.listen(PORT,() => {
      console.log(`server is running at : ${PORT}`);
   });
});

