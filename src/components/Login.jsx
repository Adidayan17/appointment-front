import React, {useState} from "react";
import {makeStyles} from "@mui/styles"
import {Typography,TextField,Button} from "@mui/material";
import {VBox,HBox} from "../sharedComponents/CustomBoxs";
import Cookies from "universal-cookie/es6";

import {Redirect} from "react-router";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

// import {CustomAppBar} from "../sharedComponents/CustomAppBar";


const useStyles = makeStyles(() => ({
        RemoveTextFieldNumberArrow: {
            '&.MuiOutlinedInput-input': {
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                    '-webkit-appearance': 'none !important'
                }
            }
        },
        field:{
           margin:"0.7rem !important"
        },
        title: {
            color:"#ff93b0 !important",
            fontSize: "2rem  !important" ,
            fontWeight: "bold  !important",
            alignItems: "center  !important"

        },spaceBetween:{
            alignItems:"center  !important",
            justifyContent:"space-between  !important",
        },
    }
));

const Login=({setLogin})=>{
    const classes=useStyles();
    const [open, setOpen ]= useState(true)
    const [phoneNumber ,setPhoneNumber ]= useState("")
    const [password ,setPassword ]= useState("")
    const [success ,setSuccess]= useState(false)
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
            if(response.data) {
                setSuccess(true)
                setLogin(false)
                window.location.reload();
            }
            else {
                alert("שם משתמש או סיסמא שגויים")
            }
        })
    }

    return(
        <VBox>
            {success&& <Redirect to={"/mainPage"}/>}
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle><Typography className={classes.title} >הזן פרטים</Typography></DialogTitle>
                <DialogContent>
                    <HBox className={classes.spaceBetween}>
                    <TextField
                        autoFocus
                        className={`${classes.RemoveTextFieldNumberArrow} ${classes.field}`}
                        label="מספר טלפון"
                        type="number"
                        value = {phoneNumber}
                        onChange={e=>setPhoneNumber(e.target.value)}
                        variant={"standard"}
                    />
                    <TextField
                        className={`${classes.RemoveTextFieldNumberArrow} ${classes.field}`}
                        label="סיסמה"
                        type="text"
                        value = {password}
                        onChange={e=>setPassword(e.target.value)}
                        variant={"standard"}

                    />
                    </HBox>
                </DialogContent>
                <DialogActions>
                    <Button onClick={e=>login()}>התחבר</Button>
                </DialogActions>
            </Dialog>

        </VBox>
    )
}
export default Login;