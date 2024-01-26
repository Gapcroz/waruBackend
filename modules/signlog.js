const User = require("../models/users");
const bcrypt = require("bcrypt"); // permite encriptar un String
const jwt = require("jsonwebtoken"); // genera un token para los String encriptados
const jwkey = "qpdksmeuthal"; //
const nodemailer = require("nodemailer"); // función para recuperar contraseña
// const tokenRecovery = require("../models/tokenRecovery");

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
const sendLink = async (req, res) => {
  let receivedMail = req.body.mail;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // en true usar 465, en false usar otros ports
    auth: {
      user: "backendwaru@gmail.com", // correo por creado para pruebas del sistema waru
      pass: "hbol dcpy pxdj jtja", // nombre de contraseña de aplicación: adminAPI
    },
  });
  // colocación de token en correo electronico
  const foundUser = await User.findOne({ mail: receivedMail });
  const payload = {
    id: foundUser._id,
    username: foundUser.username,
  };

  const token = jwt.sign(payload, jwkey, { expiresIn: "15min" });

  const verificationLink = `http://localhost:3000/cambioContrasena?token=${token}`;
  const mailOptions = {
    from: {
      name: "WaruSupport",
      address: "backendwaru@gmail.com",
    },
    to: receivedMail,
    subject: "Restablecer contraseña",
    html: `<b>Please click on the following link or paste this into your browser to complete the process: </b><a href="${verificationLink}">Cambio de contraseña</a>`,
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("El correo ha sido enviado");
    } catch (error) {
      console.log(error);
    }
  };

  sendMail(transporter, mailOptions);

  // ejercicio de prueba para guardar un nuevo modelo de token para salvar contraseñas
  // const newToken = new tokenRecovery({
  //   token: token,
  //   username: foundUser.username,
  //   mail: foundUser.mail,
  // });

  // const createdToken = await newToken.save();
  // --------------------------------------------------------------------------------
  return res.status(202).json({
    msg: "correo enviado",
    token: token,
    success: true,
  });
};

// función en desarrollo
const changePassword = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const encryptionPassword = await bcrypt.hash(password, 10);
    return User.updateOne(
      { username: username },
      {
        $set: {
          password: encryptionPassword,
        },
      }
    ).then((resultado) => {
      res.status(200).json({
        msg: "Contraseña actualizada en base de datos",
        success: true,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signin: signin,
  login: login,
  sendLink: sendLink,
  changePassword: changePassword,
};
