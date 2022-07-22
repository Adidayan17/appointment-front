import React, {useState} from "react";
import {makeStyles,TextField,Button,Typography} from "@material-ui/core";
import {VBox} from "../sharedComponents/CustomBoxs";


import axios from "axios";

// import {CustomAppBar} from "../sharedComponents/CustomAppBar";


const useStyles = makeStyles(() => ({
        registerPage:{
  alignItems:"center"
        },
        title:{
            color:"#3f51b5",
            fontSize:"2rem",
            fontWeight:"bold",
            alignItems:"center"
        },
    }
));

const RegisterPage=()=>{
    const classes=useStyles();

    const [user, setUser ]= useState({clientName:"",phoneNumber:"",password:""})


    const signUp =()=>{
        let data = new FormData();
        data.append("clientName", user.clientName)
        data.append("phoneNumber", user.phoneNumber)
        data.append("password",user.password)
        axios.post("http://127.0.0.1:8989/create-client",data).then((response)=>{
            if (response.data) {
                alert("user created successfully")
            } else {
                alert("username already exist !")
            }
        })
    }

    return(
        <VBox className={classes.registerPage} >
            <Typography className={classes.title}>עמוד הרשמה </Typography>

            <TextField
                autoFocus
                label="שם מלא"
                type="text"
                value = {user.clientName}
                onChange={e=>setUser({...user,clientName:e.target.value})}
            />
                    <TextField
                        autoFocus
                        label="מספר טלפון"
                        type="number"
                        value = {user.phoneNumber}
                        onChange={e=>setUser({...user,phoneNumber:e.target.value})}
                    />
                    <TextField
                        label="סיסמה"
                        type="text"
                        value = {user.password}
                        onChange={e=>setUser({...user,password:e.target.value})}
                    />

                    <Button onClick={e=>signUp()}>הרשמה</Button>
        </VBox>
    )
}
export default RegisterPage;