import {Button, makeStyles, Typography} from "@material-ui/core";
import {VBox,HBox} from "../sharedComponents/CustomBoxs";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import {Card, Dialog} from "@mui/material";
import {Link} from "react-router-dom";





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


const PersonalPage=()=>{

    const classes=useStyles();
    const [appointmentList , setAppointmentList]= useState([])
    const [agree,setAgree]=useState(false)


    useEffect(()=>{
        const cookies =new Cookies()
        const token =cookies.get("token")
        axios.get("http://127.0.0.1:8989/get-clients-appointments",{
            params:{
                token :token
            }}).then((response)=>{
                setAppointmentList(response.data)
        })
    },[agree])

    return(
        <VBox className={classes.allPage}>
            <HBox className={classes.homePage}>
                <Typography className={classes.title} >הפגישות שלי</Typography>
            </HBox>
            {appointmentList.map((appointment,i) => {
                return(
                <Appointment
                    key={i}
                    appointment={appointment}
                    setAgree={setAgree}/>
                )})
            }
            <Link to ={"/mainPage"}>לקביעת תורים </Link>
        </VBox>
    )
}

const Appointment = ({appointment,setAgree})=>{
    const classes=useStyles();
    const [showDialog,setShowDialog]=useState(false)


   const deleteAppointment=()=>{
       setAgree(true)
       setShowDialog(false)
       let data = new FormData();
       const cookies =new Cookies()
       const token =cookies.get("token")
       data.append("token",token )
       data.append("appointmentId",appointment.id )
       axios.post("http://127.0.0.1:8989/delete-appointment",data).then((response)=>{
           alert(" התור בוטל בהצלחה ")
           setAgree(false)
       })
    }
    return(
        <Card>
            <VBox>
                <Typography className={classes.title} >פגישה ל{appointment.employee.employeeName}</Typography>
                <Typography >לתחום : {appointment.employee.role}</Typography>
                <Typography >נקבעה לתאריך : {appointment.date}</Typography>
                <Typography >בשעה : {appointment.startTime}</Typography>
                <Button onClick={e=> setShowDialog(true)}>לביטול התור </Button>
            </VBox>
            {showDialog &&
            <Dialog open={showDialog}>
            <VBox>
                <Typography>האם את/ה מאשר/ת ביטול תור קיים ?</Typography>
                <Button onClick={e=>deleteAppointment()}>כן </Button>
                <Button onClick={e=>setShowDialog(false)}>לא</Button>
            </VBox>
            </Dialog>}

        </Card>
    )
}
export default PersonalPage;