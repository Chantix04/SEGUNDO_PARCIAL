require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mysql = require('mysql2');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.set('port', process.env.PORT || 3000);

//conexion a mariadb
app.get("/check-mariadb-connection", (_req, res) => {

    //Datos de conexion
    const connection = mysql.createConnection({
      host: "mariadb-parcial",
      user: "root",
      password: "root",
      port: 3306,
      database: "test",
    });
  
  
    connection.connect((error) => {
      if (error) {
        console.error("Error al conectar a la base de datos:", error);
        res
          .status(500)
          .json({ error: "Error al conectar a la base de datos de MariaDB" });
      } else {
        res.json({ msg: "Conexión exitosa a la base de datos de MariaDB" });
      }
    });
});

//Conexion a mongodb
app.get("/check-mongodb-connection", (_req, res) => {
    //url de mongodb
    const url = "mongodb://mongodb-database:27017/test";
  
  
    mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Conexión exitosa a MongoDB");
      res.json({ msg: "Conexión exitosa a la base de datos de MongoDB" });
    })
    .catch((err) => {
      console.error("Error al conectar a MongoDB:", err);
      res
        .status(500)
        .json({ error: "Error al conectar a la base de datos de MongoDB" });
    });
  });

app.listen(app.get('port'), () => {
  console.log(`API escuchando en http://localhost:${app.get('port')}`);
});
