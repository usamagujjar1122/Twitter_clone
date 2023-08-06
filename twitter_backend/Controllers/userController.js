const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const Otp = require("../Models/otp.model")
const bcrypt = require("bcrypt");
const jwt_decode = require("jwt-decode");
const helper = require('../utils/helper');
const { transporter } = require("../utils/mailer");
const Post = require("../Models/post.mdel");
var mongoose = require('mongoose');
require('dotenv').config();

exports.test = async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: 'mgujjargamingm@gmail.com',
      subject: "Twitter Reset Password",
      html: `Welcone`
    })
    return res.status(200).json({ success: true, })
  } catch (error) {
    console.log(error)
  }
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
    if (!email.includes('@') || !email.includes('.com')) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid email address"
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
    console.log(otp)
    const docs = await Otp.findOne({ email })
    if (docs) {
      docs.otp = otp
      await docs.save()
    } else {
      const doc = new Otp({ email, otp })
      await doc.save()
    }
    const mail = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Twitter OTP",
      html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2" >
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Twitter</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Twitter. Use the following OTP to Signup.</p>
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
    const { email, name, dob, password } = req.body
    const p = await bcrypt.hash(password, 12);
    const user = new User({ email, dob, name, password: p, username: email.split('@')[0] })
    await user.save();
    const token = jwt.sign({ _id: user._id }, "JWT_SECRET");
    return res.status(200).json({
      success: true,
      message: "Account Created Successfully",
      token,
      user
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: error.message });
  }
}
exports.signup_via_google = async (req, res) => {
  try {
    const { token } = req.body
    const user_data = jwt.decode(token)
    const pre_exists = await User.findOne({ email: user_data.email })
    if (pre_exists) {
      return res.status(400).json({ success: false, message: 'Email is already registered' })
    }
    const p = await bcrypt.hash(user_data.sub, 12);
    const user = new User({
      email: user_data.email,
      name: user_data.name,
      password: p,
      username: user_data.email.split('@')[0]
    })
    await user.save();
    const tokenn = jwt.sign({ _id: user._id }, "JWT_SECRET");
    return res.status(200).json({
      success: true,
      message: "Account Created Successfully",
      token: tokenn,
      user
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: error.message });
  }
}
exports.login_via_password = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Email" });
    }

    const user = await User.findOne({ email });
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

};


exports.login_via_google = async (req, res) => {
  try {
    const { token } = req.body;
    const user_data = jwt.decode(token)
    const user = await User.findOne({ email: user_data.email });
    if (user) {
      const compare = await bcrypt.compare(user_data.sub, user.password);
      if (compare) {
        const token = jwt.sign({ _id: user._id }, "JWT_SECRET");
        return res
          .status(200)
          .json({ success: true, message: "Login Success", user, token });
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

};


exports.loaduser = async (req, res) => {
  const token = req.headers.x_auth;
  if (token) {
    var data = jwt_decode(token);
    try {
      const docs = await User.findById(data._id)
      if (docs) {
        res.status(200).json({ success: true, user: docs, token: token })
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
    < div style = "font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2" >
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
      </div >
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

exports.create_post = async (req, res) => {
  try {
    const msg = req.body.post
    const { _id } = jwt.decode(req.headers.token)
    const user = await User.findById(_id)
    if (!user) {
      res.status(400).json({ message: "Un-Authorized Attempt!" })
    }
    const post = new Post({ user: user._id, msg })
    post.save()
    res.status(200).json({
      success: true,
      post
    })
  } catch (error) {
    return res.status(400).json({ success: false })
  }
}

exports.get_profile = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const user = await User.findById(id)
    const posts = await Post.aggregate([
      { $match: { user: id } },
      {
        $lookup: {
          from: 'users',
          let: { userId: { $toObjectId: "$user" } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userId"]
                }
              }
            }
          ],
          as: "user"
        }
      }
    ])
    if (!user) {
      res.status(400).json({ success: false })
    }
    res.status(200).json({ success: true, user, posts })
  } catch (error) {
    return res.status(400).json({ success: false })
  }
}

exports.follow = async (req, res) => {
  try {
    const { _id } = jwt.decode(req.headers.token)
    const profile_id = req.body.follow_him
    const profile = await User.findById(profile_id)
    const user = await User.findById(_id)
    if (user.following.includes(profile_id)) {
      user.following.splice(user.following.indexOf(profile_id), 1)
      profile.followers.splice(profile.followers.indexOf(_id), 1)
    } else {
      user.following.push(profile_id)
      profile.followers.push(_id)
    }
    await profile.save()
    await user.save()
    return res.status(200).json({
      success: true,
      user,
      profile
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

exports.like = async (req, res) => {
  try {
    const { post_id } = req.body
    const { _id } = jwt.decode(req.headers.token)
    // const user = await User.findById(_id)
    // if(!user){
    //   res.status(400).json({success:false, message : 'Un-Authorized Attempt!'})
    // }

    const post_save = await Post.findById(post_id)
    if (post_save.likes.includes(_id)) {
      post_save.likes.splice(post_save.likes.indexOf(_id), 1)
    } else {
      post_save.likes.push(_id)
    }
    await post_save.save()
    const post = await Post.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(post_id) } },
      {
        $lookup: {
          from: 'users',
          let: { userId: { $toObjectId: "$user" } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userId"]
                }
              }
            }
          ],
          as: "user"
        }
      },
    ])

    return res.status(200).json({
      success: true,
      post: post[0]
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
exports.set_username = async (req, res) => {
  try {
    const { _id } = jwt.decode(req.headers.token)
    const pre_exists = await User.findOne({ username: req.body.username })
    if (pre_exists) {
      return res.status(400).json({ success: false, message: `Username ${req.body.username} not available` })
    }
    const user = await User.findByIdAndUpdate(_id, { username: req.body.username })

    return res.status(200).json({ success: true, messgae: 'Username Updated!' })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }

}

exports.get_posts = async (req, res) => {
  try {
    const { _id } = jwt.decode(req.headers.token)
    const { currentPage, batchSize } = req.body
    const user = await User.findById(_id)
    if (!user) {
      res.status(400).json({ message: "Un-Authorized Attempt!" })
    }
    user.following.push(_id)
    const skipDocuments = (currentPage - 1) * batchSize;
    const posts = await Post.aggregate([
      { $match: { user: { $in: user.following } } },
      {
        $lookup: {
          from: 'users',
          let: { userId: { $toObjectId: "$user" } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userId"]
                }
              }
            }
          ],
          as: "user"
        }
      },
      { $sort: { createdAt: -1 } },
      { $skip: skipDocuments },
      { $limit: batchSize },

    ])
    res.status(200).json({
      success: true,
      posts
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: error.message })
  }
}

exports.delete_post = async (req, res) => {
  try {
    const { post_id } = req.body
    const { _id } = jwt.decode(req.headers.token)
    const user = await User.findById(_id)
    if (!user) {
      res.status(400).json({ success: false, message: 'Un-Authorized Attempt!' })
    }

    await Post.findByIdAndDelete(post_id)
    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
