import {makeStyles, TextField, Button, Typography} from "@material-ui/core";
import {HBox, VBox} from "../sharedComponents/CustomBoxs";
import React, {useEffect, useState} from "react"
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import {DatePicker} from '@mui/x-date-pickers';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import axios from "axios";
import HAIR from '../assets/HAIR.jpg'
import Nails from '../assets/nails.jpg'
import Beauty from '../assets/beauty.jpg'
import Cookies from "universal-cookie/es6";

import {NavLink} from "react-router-dom";


const useStyles = makeStyles(() => ({
        mainPage: {
            alignItems: "center",
            justifyContent: "center",
            background: "#fae1e1",
            height: "50rem"
        },
        title: {
            color: "#ff93b0 !important",
            fontSize: "2rem  !important",
            fontWeight: "bold  !important",
            alignItems: "center  !important"

        }, subTitle: {
            color: "#ff93b0 !important",
            fontSize: "1rem  !important",
            fontWeight: "bold  !important",
            alignItems: "center  !important",
            marginTop: "2rem"
        },
        card: {
            width: "45rem !important",
            height:"70rem !important",
            borderRadius:"50px"
        },
        select: {
            width: "12rem"
        },
        datePicker: {
            width: "12rem",
            marginBottom: "0.4rem"
        },
        spaceBetween: {
            alignItems: "center !important",
            justifyContent: "space-between !important",
        },
        buttons:{
            background:"#ff93b0",
            color:"#ffffff",
            margin:"0.4rem",
        },logOut:{
            marginRight:"70rem"
        },myAppo:{
            textDecoration:"none !important",
            color:"#ffffff !important"
        }
    }
));

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <><Typography>קרא עוד</Typography><IconButton {...other} /></>;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const MainPage = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [listAvailableAppointment, setListAvailableAppointment] = useState([]);
    const [employeeList, setEmployeeList] = useState([])
    const [appointmentEmployee, setAppointmentEmployee] = useState("")
    const [appointmentTime, setAppointmentTime] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [disable, setDisable] = useState(false);
    const [chosenFile, setChosenFile] = useState(" ")
    const [cardInfo, setCardInfo] = useState({title: " ", image: " ", details: " ", appointments: []});
    const [token, setToken] = useState("")
    let d = new Date();
    let  howManyAppointmentsForClient

    useEffect(() => {

        const cookies = new Cookies();
        setToken(cookies.get("token"))

    }, [])
    const logOut = () => {
        const cookies = new Cookies();

        cookies.remove("token");
        window.location.reload();
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const infoCard = (e, field) => {
        setAppointmentDate("");
        setAppointmentEmployee("");
        setAppointmentTime("");
        setShowCard(true);
        setDisable(false)
        setChosenFile(field)
        axios.get("http://127.0.0.1:8989/get-employees-by-role", {
            params: {
                role: field
            }
        }).then((response) => {
            setEmployeeList(response.data)
        })
        switch (field) {
            case "hair stylist" :
                setListAvailableAppointment(["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"])
                setCardInfo({title: "מספרה  ", image: HAIR, details: "אנחנו מספרה ", appointments: []})
                break;
            case "nail artist" :
                setListAvailableAppointment(["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"])
                setCardInfo({title: "ציפורניים  ", image: Nails, details: "אנחנו ציפורניים  ", appointments: []})
                break;
            case "eyebrow artist" :
                setListAvailableAppointment(["08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00"])
                setCardInfo({title: "שפם וגבות   ", image: Beauty, details: "אנחנו שפם וגבות  ", appointments: []})
                break;
        }
    }
    const dateChange = (date) => {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formatDate = dd + '/' + mm + '/' + yyyy
        return formatDate
    }
    const getEmployeeAppointment = (e) => {
        setAppointmentTime("")
        let temp = [], results = listAvailableAppointment
        const currentDate = new Date();
        const todayFormatDate = dateChange(currentDate )
        const hours = currentDate.getHours().toString()
        const formatDate=  dateChange(appointmentDate)
        setDisable(true)
        axios.get("http://127.0.0.1:8989/get-employees-appointments", {
            params: {
                employeeId: appointmentEmployee.id, date: formatDate
            }
        }).then((response) => {
            response.data.map((appointment) =>
                temp.push(appointment.startTime)
            )

            temp.map((temp) => {
                return (
                    results = results.filter(time => {
                        return (time !== temp)
                    })
                )


            })

            if(todayFormatDate===formatDate ){

            results = results.filter(time => {
                return (parseInt(time)>parseInt(hours))
            })
            }

            setCardInfo({...cardInfo, appointments: results});
        })



    }
    const checkHowManyAppointments = () => {
        axios.get("http://127.0.0.1:8989/get-clients-appointments-by-role", {
            params: {token: token, role: chosenFile}
        })
            .then((response) => {
                howManyAppointmentsForClient = response.data.length;

                makeAppointment()
            })


    }
    const makeAppointment = () => {
        if (howManyAppointmentsForClient < 1) {
            let data = new FormData();
            setDisable(false)
           const formatDate=  dateChange(appointmentDate)
            data.append("token", token)
            data.append("employeeId", appointmentEmployee.id)
            data.append("date", formatDate)
            data.append("startTime", appointmentTime)
            axios.post("http://127.0.0.1:8989/add-appointment", data).then((response) => {
                alert(" התור נקבע בהצלחה ")
            })
        } else {
            alert("יש לך כבר תור לתחום זה , אם ברצונך לקבוע תור יש לבטל תור קיים או להתקשר למכון היופי , תודה על ההבנה  ")

        }

    }


    return (
        <VBox className={classes.mainPage}>
            <HBox>
            <Button onClick={e => logOut()} className={`${classes.buttons} `}>התנתק </Button>
            <Button className={`${classes.buttons} ${classes.logOut} `}><NavLink to={"/personalPage"} className={classes.myAppo} > התורים שלי</NavLink>   </Button>
            </HBox>
            <Typography className={classes.title}>מערכת לקביעת תורים</Typography>
            <Typography className={classes.subTitle}> בחר/י את השירות הרצוי </Typography>
            <HBox className={classes.spaceBetween}>
                <Button onClick={e => infoCard(e, "hair stylist")} className={classes.buttons} >מספרה</Button>
                <Button onClick={e => infoCard(e, "nail artist")} className={classes.buttons} >ציפורניים</Button>
                <Button onClick={e => infoCard(e, "eyebrow artist")} className={classes.buttons} >שפם / גבות </Button>
            </HBox>
            <Card className={classes.card} style={{visibility: showCard ? "visible" : "hidden"}}>
                <CardHeader
                    title={cardInfo.title}
                />
                <CardMedia
                    component="img"
                    height="160"
                    image={cardInfo.image}
                    alt={cardInfo.title}
                />
                <CardContent>
                    <Typography>
                        <VBox>
                            <Select
                                className={classes.select}
                                value={appointmentEmployee}
                                input={<OutlinedInput/>}
                                onChange={e => setAppointmentEmployee(e.target.value)}
                                disabled={disable}

                            >
                                {employeeList.map((employee, i) => (
                                    <MenuItem
                                        key={i}
                                        value={employee}>
                                        {employee.employeeName}
                                    </MenuItem>
                                ))}
                            </Select>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disablePast={true}
                                    value={appointmentDate}
                                    inputFormat="dd/MM/yyyy"
                                    onChange={(newValue) => {
                                        setAppointmentDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} className={classes.datePicker}/>}
                                    maxDate={d.setMonth(d.getMonth() + 6)}
                                    disabled={disable}
                                />
                            </LocalizationProvider>
                            <Button onClick={e => getEmployeeAppointment(e)}
                                    disabled={(appointmentEmployee.length === 0 || !!!appointmentDate) || disable}>לרשימת
                                התורים</Button>
                            {disable &&
                            <>
                                <Select
                                    className={classes.select}
                                    value={appointmentTime}
                                    input={<OutlinedInput/>}
                                    onChange={e => setAppointmentTime(e.target.value)}
                                    disabled={appointmentDate.length === 0}
                                >
                                    {cardInfo.appointments.map((appointment, i) => (
                                        <MenuItem
                                            key={i}
                                            value={appointment}>
                                            {appointment}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button onClick={e => checkHowManyAppointments()}
                                        disabled={appointmentTime.length === 0}>לקביעת תור </Button>
                                <Button onClick={e => setDisable(false)}>חזרה לבחירת נתונים </Button>

                            </>
                            }
                        </VBox>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {cardInfo.details}
                    </CardContent>
                </Collapse>
            </Card>



        </VBox>
    )

}
export default MainPage;