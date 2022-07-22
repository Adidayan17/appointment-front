import React, {useState} from "react";
import {makeStyles, Typography,TextField,Button} from "@material-ui/core";
import {VBox,HBox} from "../sharedComponents/CustomBoxs";
import Cookies from "universal-cookie/es6";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

// import {CustomAppBar} from "../sharedComponents/CustomAppBar";


const useStyles = makeStyles(() => ({

    }
));

const Login=({setLogin})=>{
    const classes=useStyles();
    const [open, setOpen ]= useState(true)
    const [phoneNumber ,setPhoneNumber ]= useState("")
    const [password ,setPassword ]= useState("")

    const handleClose = () => {
        setOpen(false);
        setLogin(false);
    };
    const login =()=>{
        axios.get("http://127.0.0.1:8989/login",{
            params:{
            password:password, phoneNumber:phoneNumber
        }}).then((response)=>{
            let cookies = new Cookies()
            cookies.set("token", response.data)

        })
    }

    return(
        <VBox>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle><Typography className={classes.title} >הזן פרטים</Typography></DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="מספר טלפון"
                        type="number"
                        value = {phoneNumber}
                        onChange={e=>setPhoneNumber(e.target.value)}
                    />
                    <TextField
                        label="סיסמה"
                        type="text"
                        value = {password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={e=>login()}>התחבר</Button>
                </DialogActions>
            </Dialog>

        </VBox>
    )
}
export default Login;