//this files sseperates the code required for connecting databse to server code
const mysql=require("mysql");   //importing files needed to access mysql database
const dotenv=require("dotenv");   //importing files to manage basic details of the server
dotenv.config();  //helps configure files
  
const connection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE, 
});

connection.connect((error)=> {
    if(error) throw error;
    console.log("Connection Successful");
});

module.exports=connection;  //So that this file can be imported by server file 