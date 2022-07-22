import {Button, makeStyles, Typography} from "@material-ui/core";
import {VBox,HBox} from "../sharedComponents/CustomBoxs";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import Login from "../components/Login"
// import {CustomAppBar} from "../sharedComponents/CustomAppBar";


const useStyles = makeStyles(() => ({
        homePage:{
            alignItems:"center",
            justifyContent:"center"
        },
        title:{
            color:"#3f51b5",
            fontSize:"2rem",
            fontWeight:"bold",
            alignItems:"center"
        },
        linkList:{

        }
    }
));

const HomePage=()=>{
    const classes=useStyles();
    const [login, setLogin]= useState(false)

    return(
        <VBox>
            <HBox className={classes.homePage}>
                <Typography className={classes.title} >ברוכים הבאים למכון היופי ביוטי</Typography>
            </HBox>
            <HBox className={classes.linkList} >
            <nav><Link to={'/registerPage'}>הרשמה</Link></nav>
            </HBox>
            <Button onClick={e=>setLogin(true)}>התחברות</Button>
            {login && <Login setLogin={setLogin}/>}
        </VBox>
    )
}
export default HomePage;