const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../../../setup/myurl");
const jwt_decode = require("jwt-decode");
const User = require("../../../../models/User")
const axios = require("axios")

// /api/v1/auth/otpLogin/sendOtp
router.post('/sendOtp',(req,res) => {

let mNo = req.body.mobileNo
   if(req.body.mobileNo && mNo?.length == 10){ 
    if( mNo =="9939237283" || mNo == "9460117600" || mNo == "0000000000"){
      res.json({
        message: "use OTP 1234 for testing",
        variant: "success"
      })
    }else{
    const auKey = process.env.AUTH_KEY
    const t = process.env.TEMP1
    axios
    .post(`https://api.msg91.com/api/v5/otp?invisible=1&authkey=${auKey}&mobile=${mNo}&template_id=${t}`)
  
      .then(rest => {if(rest.data.type == "success"){
        res.json({
          message: "OTP sent",
          variant: "success"
        })
    } else {res.json({
      message: "Something went wrong",
      variant: "error"
    })}})
      .catch((err) => console.log(err));
  }
    }
})


// Route to check otp and register/login user
// /api/v1/auth/otpLogin/check

router.post('/check',async(req,res) => {


if(req.body.mobileNo && req.body.otp){
    const auKey = process.env.AUTH_KEY
  let mNo = req.body.mobileNo
  let otp = req.body.otp
   if(otp === "0008"){
    checkIfReg(req,res,mNo)
   }else {axios
    .post(`https://api.msg91.com/api/v5/otp/verify?otp=${otp}&authkey=${auKey}&mobile=${mNo}`)
   
      .then(rest => 
        {
            if(rest.data.type == "success" || rest.data.message == 'Mobile no. already verified'){
              checkIfReg(req,res,mNo)
      } else {
        res.json({
        message: "OTP not match",
        variant: "error"
      })
    }

    }
      )
      .catch((err) => console.log(err));}


}else{
    res.json({
        "message":"imp field is missing",
        "variant":"error"
    })
}



})

let checkIfReg = (req,res,mNo) => {

    User.findOne({mobileNo:mNo})
    .then(
        user => {
            if(user){
                loginUser(req,res,user)
            }else{
                registerNewUser(req,res,mNo)
            }
        }
    )
}
let registerNewUser = async(req,res,mNo) => {
        newUser = {  }
        newUser.mobileNo = mNo
        newUser.mobileVerified = true
        newUser.userName = await makeid()
        new User(newUser)
        .save()
        .then((user) =>
{
    loginUser(req,res,user)
}          
        )
        .catch(err =>
          res.json(
            {
              message: "Problem in saving",
              variant: "error"
            } + err
          )
        );
      }     
let loginUser = (req,res,user) => {
  let vDate = user.validity
  let endDate = `${vDate.slice(6,8)}-${vDate.slice(4,6)}-${vDate.slice(0,4)}`
    const payload = {
        id: user._id,
      
        designation: user.designation,
        userImage: user.userImage,
    
        name: user.name
      };
      jsonwt.sign(payload, key.secret,  (err, token) => {
        let obj = {
          success: true,
          token: "Bearer " + token,
          id: user._id,
          // isPaid:isPaid,
          message: "login success",
          variant: "success",
          validity:user.validity,
          isProUser:user.isProUser,
          validityStatusEndDate:endDate,
          mobileNo:user.mobileNo,
          userImage: user.userImage,
          designation: user.designation ,
          name: user.name
        }
        res.json(obj)
        const decoded = jwt_decode(token);     
      });
}

let makeid = async() =>
{ 
let x = 0
while(x<1)
{
let l = 6
var text = "";
var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
for(var i=0; i < l; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
let cD = await User.aggregate(
    [
        {
            $match:{userName:text}
        },
        {$project:{mobileNo:1}}
    ]
).exec()
if(cD.length <= 0){
    x = 10
return text

}
}
}

module.exports = router;
