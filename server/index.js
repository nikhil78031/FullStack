const express = require("express"); // importing the express in the code
const app = express();  // to routing
const db = require('./models');
const cors = require('cors');
app.use(express.json());
app.use(cors());
require("dotenv").config();
//Router
const postRouter = require("./routes/posts");
app.use("/posts",postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments",commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth",usersRouter);


const likesRouter = require("./routes/Likes");
app.use("/likes",likesRouter);




db.sequelize.sync().then(()=>{
    
    app.listen(3001,()=> {
        console.log("Server Running on 3001");
    });
});





