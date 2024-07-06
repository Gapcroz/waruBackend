# waruBackend

proyecto desarrollo de backEnd de la app web

Instalar usando (npm install) las siguientes dependencias:
"dependencies": {
"bcrypt": "^5.1.1",
"body-parser": "^1.20.2",
"cors": "^2.8.5",
"dotenv": "^16.3.1",
"express": "^4.18.2",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.0.4",
"nodemailer": "^6.9.8"

- El número después del símbolo de caret (^) indica que puedes instalar cualquier versión que sea compatible con la versión señalada o superior.

- **bcrypt (^5.1.1)**:
  bcrypt es una biblioteca que se utiliza para el hash de contraseñas. Es especialmente útil en aplicaciones de autenticación donde necesitas almacenar contraseñas de forma segura.

- **body-parser (^1.20.2)**:
  body-parser es un middleware para Express que analiza los cuerpos de las solicitudes HTTP entrantes y los convierte en un objeto JavaScript que está disponible en el objeto request de Express. Esto facilita el manejo de datos POST en las solicitudes.

- **cors (^2.8.5)**:
  cors es un middleware que permite a los servidores especificar quién puede acceder a los recursos del servidor. Ayuda a gestionar problemas de política de mismo origen (Same-Origin Policy) en los navegadores al permitir o restringir solicitudes desde diferentes orígenes.

- **dotenv (^16.3.1)**:
  dotenv carga variables de entorno desde un archivo .env en tu aplicación Node.js. Esto es útil para configurar variables de entorno como claves secretas, credenciales de bases de datos, etc., sin necesidad de hardcodearlas en tu código fuente.

- **express (^4.18.2)**:
  express: es un marco (framework) web para Node.js. Facilita la creación de aplicaciones web y APIs de manera sencilla. Proporciona herramientas para manejar rutas, solicitudes HTTP, middleware, y más.

- **jsonwebtoken (^9.0.2)**:
  jsonwebtoken es una biblioteca para la generación y verificación de tokens JWT (JSON Web Tokens). Los JWT son utilizados comúnmente para autenticación y autorización en aplicaciones web y APIs.

- **mongoose (^8.0.4)**:
  mongoose es una biblioteca de modelado de objetos MongoDB para Node.js. Simplifica la interacción con bases de datos MongoDB a través de Node.js, proporcionando una capa de abstracción para trabajar con esquemas y modelos.

el proyecto de backEnd esta enfocado en el sistema CRUD (create)Crear, (Read)Leer, (Update)Actualizar y (delete)Eliminar son operaciones fundamentales para el desarrollo de aplicaciones ya que permiten una gestión completa de datos.

todas las funciones son almacenadas en una carpeta de modulos las cuales estarán separadas de acuerdo a su relación de uso, actualmente contamos con funciones de:

Archivo Signlog.js:

nuevo Ingreso (SignUp)
conectarse (Log In)
restablecer contraseña (sendLink, changePassword)

archivo test.js:

autodiagnostico Completo (completeTest) en desarrollo...
encontrar diagnosticos (autoDiagnostico) en desarrollo...

el envio de modulos al final de cada archivo lleva el mismo orden de las funciones para encontrar rapido las posibles fallas o cambios quie pueda sufrir el proyecto.

module.exports = {
signin: signin,
login: login,
sendLink: sendLink,
changePassword: changePassword,
};

module.exports = {
completeTest: completeTest,
autoDiagnostico: autoDiagnostico,
};

al final cada una de las funciones puede ser invocada desde el archivo Index.js el cual lleva el arranque del sistema.

actualmente contamos con el sistema actualizado en repositorios GitHub:

https://github.com/Gapcroz/waruBackend

La rama Main se actualiza solamente cuando en otras ramas se logra finalizar tareas que están en desarrollo y pueden tener uso con postman o React, así permitimos tener una buena supervisión y continuidad entre los compañeros para implementar nuevas funciones sin arrastrar errores.
