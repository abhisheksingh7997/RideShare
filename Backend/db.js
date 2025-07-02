import mysql from "mysql2/promise" ;
import dotenv from "dotenv";
dotenv.config() ;
export const db = await mysql.createConnection({
    host:"localhost",
    user:"root" ,
    password: process.env.dbPassword,
    database:"usersData",
});
console.log("MySQL connected") ;