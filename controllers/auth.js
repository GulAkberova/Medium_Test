const bcrypt=require("bcrypt")
const users=[]
const authController={
    register:async(req,res)=>{
    //Check User
    try{
        const hashedPassword =await bcrypt.hash(req.body.password,10)
        users.push({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        res.redirect("/login")

    }catch(e){
        res.redirect("/register")

    }
    // Create a new user
    // Hash the password

    },
    login:(req,res)=>{
        res.send('helloyyy')

    },
    logout:(req,res)=>{
        res.send('hellolll')

    }
}
module.exports={
    authController
}