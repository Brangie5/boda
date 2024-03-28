import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port=3000;


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "wedding",
    password: "12345678",
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let numId=0;
let idExist=0;
let num_ass_1=0;
let num_ass_2=0;
let num_ass_3=0;
let num_ass_4=0;
let num_ass_5=0;
let num_ass_6=0;
let err= "Escriba el ID";

let inv= [
    {invitado1: "", invitado2: "", invitado3: "", invitado4: "", invitado5: "", invitado6: ""},
];
let ass= [
    {ass_inv_1: "", ass_inv2:"", ass_inv3:"", ass_inv4:"", ass_inv5:"", ass_inv6:""},
];




app.get("/",  (req, res) => {
    res.render("index.ejs", {
        invite1: inv[0].invitado1,
        invite2: inv[0].invitado2,
        invite3: inv[0].invitado3,
        invite4: inv[0].invitado4,
        invite5: inv[0].invitado5,
        invite6: inv[0].invitado6,
        // invite7: inv[0].invitado7,
        idExist: idExist,
        numId: numId,
        error: err,
        ass1: num_ass_1,
        ass2: num_ass_2,
        ass3: num_ass_3,
        ass4: num_ass_4,
        ass5: num_ass_5,
        ass6: num_ass_6,
        // ass7: num_ass_7,

    });
});

app.post("/check", async (req, res) => {

    numId = req.body["number"];

    const result= await db.query(
        "SELECT invitado1, invitado2, invitado3, invitado4, invitado5, invitado6 FROM invitados WHERE id=$1", [numId]);

    if (result.rows.length !== 0){

        const chk1= await db.query(
            "SELECT ass_inv_1, ass_inv_2, ass_inv_3, ass_inv_4, ass_inv_5, ass_inv_6 FROM invitados WHERE id=$1", [numId]);
    
            ass=chk1.rows;    
    
            if(ass[0].ass_inv_1==='Y'){
                num_ass_1=1;
            }
            if(ass[0].ass_inv_2==='Y'){
                num_ass_2=1;
            }
            if(ass[0].ass_inv_3==='Y'){
                num_ass_3=1;
            }
            if(ass[0].ass_inv_4==='Y'){
                num_ass_4=1;
            }
            if(ass[0].ass_inv_5==='Y'){
                num_ass_5=1;
            }
            if(ass[0].ass_inv_6==='Y'){
                num_ass_6=1;
            }
            // if(ass[0].ass_inv_7==='Y'){
            //     num_ass_7=1;
            // }

            inv = result.rows; 
            idExist = 1;
            res.redirect("/");
        }

    else{
        err= "ID no existe, intente de nuevo";
        res.redirect("/");
    }

    console.log(numId);
    console.log(result.rows);
});

app.post("/send", async (req, res) =>{
    const ass_inv1=req.body.inv1;
    const ass_inv2=req.body.inv2;
    const ass_inv3=req.body.inv3;
    const ass_inv4=req.body.inv4;
    const ass_inv5=req.body.inv5;
    const ass_inv6=req.body.inv6;
    // const ass_inv7=req.body.inv7;
    const msgInvite=req.body.msg;


    if (msgInvite != 0){
        db.query("UPDATE invitados SET inv_msg = $1 WHERE id=$2",[msgInvite,numId]);

    }
    

    if(ass_inv1){
        db.query("UPDATE invitados SET ass_inv_1 = 'Y' WHERE id=$1",[numId]);
        num_ass_1=1;      

    }
    else{
        
        db.query("UPDATE invitados SET ass_inv_1 = 'N' WHERE id=$1",[numId]);
        num_ass_1=0;
    }

    if(ass_inv2){
        db.query("UPDATE invitados SET ass_inv_2 = 'Y' WHERE id=$1",[numId]);
        num_ass_2=1;
    }
    else{
        db.query("UPDATE invitados SET ass_inv_2 = 'N' WHERE id=$1",[numId]);
        num_ass_2=0;
    }

    if(ass_inv3){
        db.query("UPDATE invitados SET ass_inv_3 = 'Y' WHERE id=$1",[numId]);
        num_ass_3=1;
    }
    else{
        db.query("UPDATE invitados SET ass_inv_3 = 'N' WHERE id=$1",[numId]);
        num_ass_3=0;
    }

    if(ass_inv4){
        db.query("UPDATE invitados SET ass_inv_4 = 'Y' WHERE id=$1",[numId]);
        num_ass_4=1;
    }
    else{
        db.query("UPDATE invitados SET ass_inv_4 = 'N' WHERE id=$1",[numId]);
        num_ass_4=0;
    }

    if(ass_inv5){
        db.query("UPDATE invitados SET ass_inv_5 = 'Y' WHERE id=$1",[numId]);
        num_ass_5=1;
    }
    else{
        db.query("UPDATE invitados SET ass_inv_5 = 'N' WHERE id=$1",[numId]);
        num_ass_5=0;
    }

    if(ass_inv6){
        db.query("UPDATE invitados SET ass_inv_6 = 'Y' WHERE id=$1",[numId]);
        num_ass_6=1;
    }
    else{
        db.query("UPDATE invitados SET ass_inv_6 = 'N' WHERE id=$1",[numId]);
        num_ass_6=0;
    }

    // if(ass_inv7){
    //     db.query("UPDATE invitados SET ass_inv_7 = 'Y' WHERE id=$1",[numId]);
    //     num_ass_7=1;
    // }
    // else{
    //     db.query("UPDATE invitados SET ass_inv_7 = 'N' WHERE id=$1",[numId]);
    //     num_ass_7=0;
    // }   
    
    
    res.redirect("/");

});


app.listen(port, () =>{
    console.log(`Server running on port ${port}.`);
});





