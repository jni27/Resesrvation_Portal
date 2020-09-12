var express = require("express"),
    app     = express();
    
    
    //app.use(express.static (__dirname + "/public"));
    app.set("view engine", "ejs");

    app.get("/", function(req,res){
        res.render("home");
    });
    
    //=======
    //AUTH routes
    //=======
    //***Sign up ****/
    app.get("/register", function(req,res){
        res.render("register");
    });

    //***Sign in ****/
    app.get("/login", function(req,res){
        res.render("login");
    });
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Server is running!");
    });

