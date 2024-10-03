const User = require("../models/user.js");

module.exports.rendersignupform= (req, res) => {
    res.render("./users/signup.ejs");
  }
module.exports.signup=async(req, res) => {
    try{
      let{username,email,password} = req.body;
      const newUsr= new User({username, email});
      const registereduser = await User.register(newUsr, password);
      console.log(registereduser);
      req.login(registereduser, (err) => {
          if(err){
              return next(err);
          }
          req.flash('success',"welcome to Voyager!)");
          res.redirect("/listings");
      });
      
    }catch(err){
      req.flash('error',err.message);
      res.redirect("/users/signup");
    }
  
  };
module.exports.renderlogin=(req, res) => {
    res.render("./users/login.ejs");
};
module.exports.logout=(req, res,next) => {
    req.logout((err)=>{
        if(err){
            next(err);
        }
    });
    req.flash('success',"you are logged out:)");
    res.redirect("/listings");
};
module.exports.login=async(req, res) => {
    try{
      req.flash('success',"Good to see you again :)");
      let RedirectUrl = res.locals.redirectUrl || "/listings";
      res.redirect(RedirectUrl);
    }
    catch(err){
      req.flash('error',err.message);
      res.redirect("/users/login");
    }
      
  };