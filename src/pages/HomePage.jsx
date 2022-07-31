import {Button, makeStyles, Typography} from "@material-ui/core";
import {VBox,HBox} from "../sharedComponents/CustomBoxs";
import React, {useState} from "react";
import Login from "../components/Login"
import Register from "../components/Register";
import {Card} from "@mui/material";



const useStyles = makeStyles(() => ({
        allPage:{
            alignItems:"center",
            justifyContent:"center",
            background:"#fae1e1",
            height:"55rem"
        },
        homePage:{
            alignItems:"center",
            justifyContent:"center"
        },
        title:{
            color:"#ff93b0",
            fontSize:"2.5rem",
            fontWeight:"bold",
            alignItems:"center"
        },
        homePageCard:{
            width:"20rem",
            alignItems:"center",
            justifyItems:"center",
            height:"20rem",
            margin:"5rem",
            borderRadius:"50px"
        },
        spaceBetween:{
            alignItems:"center",
            justifyContent:"space-between",
            marginTop:"2rem"
        },
        smallFont:{
            fontSize:"0.7rem",
            textDecoration:"underline"
        },
        buttons:{
            background:"#ff93b0",
            color:"#ffffff",
            marginTop:"0.3rem"
        },
        register:{
            marginTop:"4rem"
        }


    }
));

const HomePage=()=>{
    const classes=useStyles();
    const [login, setLogin]= useState(false)
    const [register, setRegister]= useState(false)

    return(
        <VBox className={classes.allPage}>
            <VBox className={classes.homePage}>
                <Typography className={classes.title} >ברוכים הבאים </Typography>
                <Typography className={classes.title} >למערכת זימון התורים </Typography>
                <Typography className={classes.title} >של מכון היופי ביוטי </Typography>
            </VBox>
            <Card className={classes.homePageCard}>
            <VBox className={classes.spaceBetween}>
                <Button onClick={e=>setLogin(true)} className={classes.buttons}>התחברות</Button>
                {login && <Login setLogin={setLogin}/>}

                <VBox className={classes.register}>
                    <Typography className={classes.smallFont}>פעם ראשונה אצלנו ? לחץ להרשמה </Typography>
                </VBox>
                <Button onClick={e=>setRegister(true)} className={classes.buttons} >הרשמה</Button>
                {register && <Register setRegister={setRegister}/>}


            </VBox>
            </Card>
        </VBox>
    )
}
export default HomePage;