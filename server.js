const express = require('express');
const app = express();
const dotenv = require("dotenv");
const connection = require("./config/db");
const bodyParser = require('body-parser');

dotenv.config();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.redirect("/create.html");
});

app.get("/data", (req, res) =>
    connection.query("select * from customer_info", (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("read.ejs", { rows });
        }
    })
)



app.get("/records", (req, res) =>
    connection.query("select * from transactions", (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("transactions.ejs", { rows });
        }
    })
)



app.post("/trans", (req, res) => {

    let sender = req.body.send;
    let receiver = req.body.receive;
    let amount = req.body.amt;
    let bal = 0;
    let date=req.body.date;
    let time=req.body.time;
    let sql = `SELECT Balance FROM customer_info WHERE Name=?`;


         

    connection.query(sql, [sender], (error, results) => {
        if (error) {
            return console.error(error.message);
        }
        let result = JSON.parse(JSON.stringify(results[0]));


        bal = result.Balance;
        if (bal >= amount) {
            bal = bal - amount;
            let sql2 = `UPDATE customer_info SET Balance =? WHERE customer_info.Name =?`;
            let sql3 = `UPDATE customer_info SET Balance =Balance+? WHERE customer_info.Name =?`;
            let sql4=`INSERT transactions (sender,receiver,amount,date,time) VALUES (?,?,?,?,?)`
            connection.query(sql2, [bal,sender], (error,results) => {
                if (error) {
                    return console.error(error.message);
                }

            });

            connection.query(sql3, [amount, receiver], (error, results) => {
                if (error) {
                    return console.error(error.message);
                }
                
                
            });
             
            connection.query(sql4,[sender,receiver,amount,date,time], (error,results) => {
                if (error) {
                    return console.error(error.message);
                }

            });
            res.redirect("/data");
        }

    });







});







// app.post("/create", (req, res) => {
//     try{

//     }
//     catch(err){
//         console.log(err);
//     }
//  });


app.listen(process.env.PORT || 4000, (error) => {
    if (error) throw error;
    console.log(`server running on ${process.env.PORT}`);
});
