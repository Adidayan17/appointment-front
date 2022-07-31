import {Button, makeStyles, Typography} from "@material-ui/core";
import {VBox, HBox} from "../sharedComponents/CustomBoxs";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import {Card, Dialog} from "@mui/material";
import {NavLink} from "react-router-dom";
import * as Add2Calendar from "add2calendar";
import 'add2calendar/css/add2calendar.css'

const useStyles = makeStyles(() => ({
        allPage: {
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            color: "#ff93b0 !important",
            fontSize: "2rem  !important",
            fontWeight: "bold  !important",
            alignItems: "center  !important"
        },
        buttons: {
            background: "#ff93b0",
            color: "#ffffff",
            margin: "0.4rem",
        },
        myAppo: {
            textDecoration: "none !important",
            color: "#ffffff !important"
        },
        appointmentCard: {
            width: "20rem !important",
            height: "25rem !important",
            borderRadius: "50px",
            margin: "1rem"
        },
        cardTitle: {
            color: "#ff93b0 !important",
            fontSize: "1.1rem  !important",
            fontWeight: "bold  !important",
            alignItems: "center  !important"
        },
        appointmentText: {
            alignItems: "center  !important"
        },
        cardText: {
            fontSize: "0.9rem  !important",
            alignItems: "center  !important"
        },
        cardText1: {
            fontWeight: "bold"
        },
        cancelButton: {
            justifyContent: "left"
        }
    }
));

const PersonalPage = () => {
    const classes = useStyles();
    const [appointmentList, setAppointmentList] = useState([])
    const [agree, setAgree] = useState(false)

    useEffect(() => {
        const cookies = new Cookies()
        const token = cookies.get("token")
        axios.get("http://127.0.0.1:8989/get-clients-appointments", {
            params: {
                token: token
            }
        }).then((response) => {
            setAppointmentList(response.data)
        })
    }, [agree])

    return (
        <VBox className={classes.allPage}>
            <HBox>
                <Typography className={classes.title}>הפגישות שלי</Typography>
            </HBox>
            {appointmentList.map((appointment, i) => {
                return (
                    <Appointment
                        key={i}
                        appointment={appointment}
                        setAgree={setAgree}/>
                )
            })
            }
            <Button className={`${classes.buttons}`}> <NavLink to={"/mainPage"} className={classes.myAppo}>חזרה לקביעת
                תורים </NavLink></Button>

        </VBox>
    )
}

const Appointment = ({appointment, setAgree}) => {
    const classes = useStyles();
    const [showDialog, setShowDialog] = useState(false)

    const addToCalendar = () => {
        let week = ['January','February','March','April', 'May ','June', 'July ', 'August ', 'September', 'October', 'November ', 'December']
        let month = parseInt(appointment.date.substring(3, 5))
        if(month==1) {
            month = week[0]
        }
        else {
            month = week[month - 1]
        }
        let day = appointment.date.substring(0, 2);
        let yyyy = appointment.date.substring(6, 10);
        if (day < 10) {
            day = '0' + day
        }
        const minu = appointment.startTime.substring(3, 5)
        const startDate = month + ' ' + day + ',' + yyyy + ' ' +     parseInt(appointment.startTime) + ':' + minu;
        const endDate = minu === "00" ? month + ' ' + day + ',' + yyyy + ' ' +  parseInt(appointment.startTime) + ':' + `30` : month + ' ' + day + ',' + yyyy + ' ' +  (parseInt(appointment.startTime) + 1) + ':' + `00`;
        const singleEvent = new Add2Calendar({
            title: appointment.employee.role,
            start: startDate,
            end: endDate,
            location: 'Ashkelon, Israel',
            description: 'תור ל ' + appointment.employee.name
        })
        singleEvent.createWidget('#single-normal')
    }
    const deleteAppointment = () => {
        setAgree(true)
        setShowDialog(false)
        let data = new FormData();
        const cookies = new Cookies()
        const token = cookies.get("token")
        data.append("token", token)
        data.append("appointmentId", appointment.id)
        axios.post("http://127.0.0.1:8989/delete-appointment", data).then((response) => {
            alert(" התור בוטל בהצלחה ")
            setAgree(false)
        })
    }
    return (
        <Card className={classes.appointmentCard}>
            <VBox className={classes.appointmentText}>
                <Typography className={classes.cardTitle}> הפגישה שלך
                    עם {appointment.employee.employeeName}</Typography>
                <Typography className={classes.cardText}>לתחום : {appointment.employee.role}</Typography>
                <Typography className={classes.cardText}>נקבעה לתאריך : {appointment.date}</Typography>
                <Typography className={classes.cardText}>בשעה : {appointment.startTime}</Typography>
            </VBox>
            <VBox className={classes.cancelButton}>
                <Button onClick={e => setShowDialog(true)} className={classes.buttons}>לביטול התור </Button>
                <Button onClick={e => addToCalendar()} className={classes.buttons}>להוסיף
                    פגישה זו ליומן? </Button>
            </VBox>
            <VBox>
                <div id="single-normal"></div>
            </VBox>
            {showDialog &&
            <Dialog open={showDialog}>
                <VBox>
                    <Typography className={`${classes.cardText1} ${classes.cardText}`}>האם את/ה מאשר/ת ביטול תור קיים
                        ?</Typography>
                    <Button onClick={e => deleteAppointment()} className={classes.buttons}>כן, ברצוני לבטל את
                        התור </Button>
                    <Button onClick={e => setShowDialog(false)} className={classes.buttons}>מעדיף שלא</Button>
                </VBox>
            </Dialog>}

        </Card>
    )
}
export default PersonalPage;