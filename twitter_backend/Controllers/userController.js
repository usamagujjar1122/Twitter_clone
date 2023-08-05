const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const Otp = require("../Models/otp.model")
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt_decode = require("jwt-decode");
const helper = require('../utils/helper');
require('dotenv').config();
var transporter = nodemailer.createTransport({
  host: "gmail",
  port: 587,
  secure: false,// true for 465 , false for other ports 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
})
exports.test = async (req, res) => {
  return res.status(200).json({ success: true, })
}
exports.signup_step_1 = async (req, res) => {
  try {
    const { email, name, dob } = req.body
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter email address"
      })
    }
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please enter your name"
      })
    }
    if (!dob) {
      return res.status(400).json({
        success: false,
        message: "Please enter date of birth"
      })
    }
    const fuser = await User.findOne({ email: email });
    if (fuser) {
      res.status(400).json({
        success: false,
        messgae: "Email already registered"
      })
    }
    res.status(200).json({
      success: true,
    })

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.signup_step_2 = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please Send Email" });
    }
    const otp = helper.generateOTP()
    const docs = await Otp.findOne({ email: email })
    if (docs) {
      docs.otp = otp
      await docs.save()
    } else {
      const doc = new Otp({ email, otp })
      await doc.save()
    }
    transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Twitter Reset Password",
      html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Twitter</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Twitter. Use the following OTP to reset your password.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Twitter</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Twitter Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
          </div>
        </div>
      </div>
            `
    })
    docs.otp = otp
    docs.save()
    res.status(200).json({ success: true, message: 'OTP sent to email address' })

  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: error.message });
  }
}
exports.signup_step_3 = async (req, res) => {
  try {
    const { email, otp } = req.body
    const user = await Otp.findOne({ email, otp })
    if (user) {
      res.status(200).json({
        success: true
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: error.message });
  }
}
exports.signup_step_4 = async (req, res) => {
  try {
    const { email, name, dob, passowrd } = req.body
    const p = await bcrypt.hash(password, 12);
    const user = new User({ email, dob, name, p })
    await user.save();
    const token = jwt.sign({ _id: user._id }, "JWT_SECRET");
    return res.status(200).json({
      success: true,
      message: "Account Created Successfully",
      data: { token },
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: error.message });
  }
}
exports.login_via_password_step_1 = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Email" });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      // const compare = await bcrypt.compare(password, user.password);
      // if (compare) {
      //   const token = jwt.sign({ _id: user._id }, "JWT_SECRET");
      //   return res
      //     .status(200)
      //     .json({ success: true, message: "Login Success", data: user, token });
      // } else {
      //   return res
      //     .status(400)
      //     .json({ success: false, message: "Invalid Crediantials" });
      // }
      return res.status(200).json({ success: true })
    } else {
      return res.status(400).json({
        success: false,
        message: "Not a registered user",
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: error.message });
  }

};

exports.login_via_password_step_2 = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Password" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        const token = jwt.sign({ _id: user._id }, "JWT_SECRET");
        return res
          .status(200)
          .json({ success: true, message: "Login Success", data: user, token });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Crediantials" });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Not a registered user",
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: error.message });
  }
}


exports.loaduser = async (req, res) => {
  const token = req.headers.token;
  if (token) {
    var data = jwt_decode(token);
    try {
      const docs = await User.findById(data._id)
      if (docs) {
        res.status(200).json({ success: true, data: docs, token: token })
      } else {
        res.status(400).json({ success: false })
      }
    } catch (error) {
      console.log(error)
      res.send({ success: false, message: "failed to get user" })
    }
  }
  else {
    res.status(400).json({ success: false, message: "failed to get user" })
  }
};

exports.forgot_step_1 = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Email" });
    }
    const docs = await User.findOne({ email: email })
    if (docs) {
      const otp = helper.generateOTP()
      transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Twitter Reset Password",
        html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Twitter</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Twitter. Use the following OTP to reset your password.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Twitter</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Twitter Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
          </div>
        </div>
      </div>
            `
      })
      docs.otp = otp
      docs.save()
      res.status(200).json({ success: true, message: 'OTP sent to email address' })
    } else {
      res.status(400).json({ success: false, message: 'Email not registered' })
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.forgot_step_2 = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const matched = await User.findOne({ email: email, otp: otp })
    if (matched) {
      res.status(200).json({ success: true, message: "OTP matched" })
    } else {
      return res.status(400).json({ success: false, message: "OTP match failed" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.forgot_step_3 = async (req, res) => {
  const { email, password, confirm_password } = req.body;
  try {
    if (password !== confirm_password) {
      return res
        .status(400)
        .json({ success: false, message: "Password match failed" });
    }
    const p = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate({ email: email }, { password: p })
    res.status(200).json({ success: true, message: "Password reset" })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
