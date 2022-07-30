import {Button, makeStyles, Typography} from "@material-ui/core";
import {VBox,HBox} from "../sharedComponents/CustomBoxs";
import React, {useState} from "react";
import Login from "../components/Login"
import Register from "../components/Register";



const useStyles = makeStyles(() => ({
        allPage:{
            alignItems:"center",
            justifyContent:"center",
        },
        homePage:{
            alignItems:"center",
            justifyContent:"center"
        },
        title:{
            color:"#3f51b5",
            fontSize:"2rem",
            fontWeight:"bold",
            alignItems:"center"
        }
    }
));

const HomePage=()=>{
    const classes=useStyles();
    const [login, setLogin]= useState(false)
    const [register, setRegister]= useState(false)

    return(
        <VBox className={classes.allPage}>
            <HBox className={classes.homePage}>
                <Typography className={classes.title} >ברוכים הבאים למכון היופי ביוטי</Typography>
            </HBox>
            <HBox>
                <Button onClick={e=>setRegister(true)}>הרשמה</Button>
                {register && <Register setRegister={setRegister}/>}
                <Button onClick={e=>setLogin(true)}>התחברות</Button>
                {login && <Login setLogin={setLogin}/>}
            </HBox>
        </VBox>
    )
}
export default HomePage;