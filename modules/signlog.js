const User = require("../models/users");
const bcrypt = require("bcrypt"); // permite encriptar un String
const jwt = require("jsonwebtoken"); // genera un token para los String encriptados
const jwkey = "qpdksmeuthal"; //
const nodemailer = require("nodemailer"); // función para recuperar contraseña

// variable para iniciar registro en pagina web
const signin = async (req, res) => {
  const { username, password, mail } = req.body;
  try {
    const mailExist = await User.exists({ mail: mail });
    if (mailExist) {
      return res.status(400).json({
        msg: "El usuario ya existe",
      });
    } else {
      const encryptionPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        password: encryptionPassword,
        mail: mail,
      });
      const createdUser = await newUser.save();
      return res.status(201).json({
        msg: "Nuevo usuario creado",
        user: createdUser._id,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// variable para iniciar sesión de pagina web
const login = async (req, res) => {
  let receivedMail = req.body.mail;
  let receivedPassword = req.body.password;
  try {
    const foundUser = await User.findOne({ mail: receivedMail });
    if (!foundUser) {
      return res.status(400).json({
        msg: "Usuario no encontrado",
      });
    } else {
      const matchUser = await bcrypt.compare(
        receivedPassword,
        foundUser.password
      );
      if (!matchUser) {
        return res.status(401).json({
          msg: "Usuario no coincide",
        });
      } else {
        const payload = {
          id: foundUser._id,
          name: foundUser.username,
        };
        const token = jwt.sign(payload, jwkey, { expiresIn: 60 });
        return res.status(200).json({
          msg: "logIn exitoso",
          token: token,
          success: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// variable pare recuperar contraseña --->>> ** incompleta **
const recoverPassword = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "backendWaru@gmail.com",
      pass: "backendw",
    },
  });
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  const userMail = req.body.mail;
  const resetToken = randomNum;

  const mailOptions = {
    from: userMail,
    to: userMail,
    subject: "Restablecer contraseña",
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://waru.com/reset-password?token=${resetToken}`,
  };

  const info = await transporter.sendMail(mailOptions, (error, info) => {
    try {
      if (error) {
        console.error(error);
        res.status(500).json({
          msg: "Error al enviar el correo electrónico.",
          success: false,
        });
      } else {
        console.log("Correo electronico enviado" + info.response);
        res.status(200).send("Correo electrónico enviado con exito.");
      }
    } catch (error) {
      console.log("algo salio mal");
    }
  });
};
module.exports = {
  signin: signin,
  login: login,
  recoverPassword: recoverPassword,
};
