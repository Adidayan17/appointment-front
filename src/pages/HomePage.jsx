import {makeStyles, Typography} from "@material-ui/core";
import {VBox} from "../sharedComponents/CustomBoxs";
import {Link} from "react-router-dom";
import React from "react";
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
    }
));



const HomePage=()=>{
    const classes=useStyles();

    return(
        <VBox>
            <VBox className={classes.homePage}>
                <Typography className={classes.title} >פורטל תרגולים </Typography>
            </VBox>
            <nav><Link to={'/loginPage'}>Login</Link></nav>
            <nav><Link to={'/registerPage'}>Sign up</Link></nav>
        </VBox>
    )
}
export default HomePage;