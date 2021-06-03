const express = require("express"); // importing the express in the code
const app = express();  // to routing
const db = require('./models');
const cors = require('cors');
app.use(express.json());
app.use(cors());

//Router
const postRouter = require("./routes/posts");
app.use("/posts",postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments",commentsRouter);



db.sequelize.sync().then(()=>{
    
    app.listen(3001,()=> {
        console.log("Server Running on 3001");
    });
});





