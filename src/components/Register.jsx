import React, {useState} from "react";
import {makeStyles, TextField, Button, Typography} from "@material-ui/core";
import {VBox} from "../sharedComponents/CustomBoxs";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from '@mui/material/DialogContent';
import axios from "axios";
import {Redirect} from "react-router";


const useStyles = makeStyles(() => ({
        registerPage: {
            alignItems: "center"
        },
        title: {
            color: "#3f51b5",
            fontSize: "2rem",
            fontWeight: "bold",
            alignItems: "center"
        },
        RemoveTextFieldNumberArrow: {
            '&.MuiOutlinedInput-input': {
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                    '-webkit-appearance': 'none !important'
                }
            }
        },
    }
));

const Register = ({setRegister}) => {

    const classes = useStyles();
    const phoneRegex = /^05\d([-]{0,1})\d{7}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const [user, setUser] = useState({clientName: "", phoneNumber: "", password: ""})
    const [phoneError, setPhoneError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [moveToLogin, setMoveToLogin] = useState(false)
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false);
        setRegister(false);
    };
    const signUp = () => {
        let data = new FormData();
        if (phoneRegex.test(user.phoneNumber)) {
            setPhoneError(false)
            if (passwordRegex.test(user.password)) {
                setPasswordError(false)
                data.append("clientName", user.clientName)
                data.append("phoneNumber", user.phoneNumber)
                data.append("password", user.password)
                axios.post("http://127.0.0.1:8989/create-client", data).then((response) => {
                    if (response.data) {
                        setMoveToLogin(true)
                        setRegister(false);
                    } else {
                        alert("user already exist !")
                    }
                })
            } else {
                setPasswordError(true)

            }
        } else {
            setPhoneError(true)
        }
    }


    return (
        <VBox className={classes.registerPage}>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle><Typography className={classes.title}> הרשמה </Typography></DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        label="שם מלא"
                        type="text"
                        value={user.clientName}
                        onChange={e => setUser({...user, clientName: e.target.value})}
                        variant={"outlined"}
                    />
                    <TextField
                        className={classes.RemoveTextFieldNumberArrow}
                        label="מספר טלפון"
                        type="number"
                        value={user.phoneNumber}
                        onChange={e => setUser({...user, phoneNumber: e.target.value})}
                        error={phoneError}
                        helperText={phoneError && "מספר טלפון לא תקין "}

                    />
                    <TextField
                        label="סיסמה"
                        type="text"
                        value={user.password}
                        onChange={e => setUser({...user, password: e.target.value})}
                        error={passwordError}
                        helperText={passwordError && "סיסמה צריכה להכיל 8 תווים לפחות אות אחת ומספר אחד"}

                    />
                </DialogContent>
                <DialogActions>
                    <Button disabled={user.password.length == 0 || user.clientName == 0 || user.phoneNumber == 0}
                            onClick={e => signUp()}>הרשמה</Button>
                    {moveToLogin && <Redirect to="/"/>}
                </DialogActions>
            </Dialog>

        </VBox>
    )
}
export default Register;