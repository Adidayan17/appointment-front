
import {makeStyles, TextField, Button, Typography} from "@material-ui/core";
import {VBox,HBox} from "../sharedComponents/CustomBoxs";
import React, {useState} from "react"
import { styled } from '@mui/material/styles';
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
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const useStyles = makeStyles(() => ({
        mainPage : {
            alignItems: "center"
        },
        title: {
            color: "#3f51b5",
            fontSize: "2rem",
            fontWeight: "bold",
            alignItems: "center"
        },
        card:{
            width :"40rem !important"
        },
        select:{
            width:"12rem"
        },
        datePicker:{
            width:"12rem",
            marginBottom:"0.4rem"
        }
    }
));

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <><Typography>קרא עוד</Typography><IconButton {...other} /></>;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const MainPage =()=>{
    const classes = useStyles();
    const [expanded, setExpanded] =useState(false);
    const [showCard, setShowCard] =useState(false);
    const [appointmentTime, setAppointmentTime] =useState("");
    const [appointmentDate, setAppointmentDate] =useState("");
    const [cardInfo ,setCardInfo] = useState({title: " ", image :" ", details : " ", appointments :[] });
    let d = new Date();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const infoCard =(e,name)=>{
        setShowCard(true);
        switch (name) {
            case 1 :
                setCardInfo({title: "מספרה  ", image: "", details: "אנחנו מספרה ", appointments: [{time:"10",date:"1010"},{time:"113",date:"1010"},{time:"112",date:"1010"}]})
                break;
            case 2 :
                setCardInfo({title: "ציפורניים  ", image: "", details: "אנחנו ציפוקנייפ  ", appointments: []})
                break;
            case 3 :
                setCardInfo({title: "שפם וגבות   ", image: "", details: "אנחנו שפם וגבות  ", appointments: []})
                break;
        }
    }

    const dateChange=(e)=>{
        let value
        const date=appointmentDate
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
         value =dd + '-' + mm + '-' + yyyy
        console.log(value)


    }
return(
    <VBox className = {classes.mainPage} >
<Typography>מערכת לקביעת תורים</Typography>
        <Button onClick={e=>infoCard(e,1)}>מספרה</Button>
        <Button onClick={e=>infoCard(e,2)}>ציפורניים</Button>
        <Button onClick={e=>infoCard(e,3)}>שפם / גבות </Button>

        <Card className ={classes.card} style={{visibility: showCard? "visible":"hidden" }}>
            <CardHeader
                title={cardInfo.title}
            />
            <CardMedia
                component="img"
                height="124"
                image={cardInfo.image}
                alt={cardInfo.title}
            />
            <CardContent>
                <Typography >
                    <VBox>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disablePast={true}
                                value={appointmentDate}
                                inputFormat="dd/MM/yyyy"
                                onAccept={(e)=>dateChange(e)}
                                onChange={(newValue)=>{setAppointmentDate(newValue);}}
                                renderInput={(params) => <TextField {...params}  className={classes.datePicker}/>}
                                maxDate={ d.setMonth(d.getMonth() +6)}
                            />
                    </LocalizationProvider>
                    <Select
                        className={classes.select}
                        value={appointmentTime}
                        input={<OutlinedInput />}
                        onChange={e=>setAppointmentTime(e.target.value)}
                        disabled={appointmentDate.length===0}
                    >
                        {cardInfo.appointments.map((appointment,i) => (
                            <MenuItem
                                key={i}
                                value={appointment}>
                                {appointment.time}
                                {/*change to start time */}
                            </MenuItem>
                        ))}
                    </Select>
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
                    <ExpandMoreIcon />
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