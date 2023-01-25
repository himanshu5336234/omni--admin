import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import TableList from "views/TableList/TableList";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);
import { useDispatch, useSelector } from "react-redux";
import Awaiting from "components/AwaitingTransaction/Awaiting";
export default function Dashboard() {


  const { getNotification } = useSelector((state) => ({ getNotification: state.user.getNotification }));

  const [Popup,setPopup] = React.useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: "Get_USERS" })
    dispatch({ type: "GET_NOTIFICATION" })
  }, [])



  const handleChange = () => {

  }
  const classes = useStyles();
  return (
    <div>

      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <div  style={{  cursor:" pointer"}}>
          <Card onClick={()=>{setPopup(true)}}>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Awaiting</p>
              {getNotification.length && (<>   <h3 className={classes.cardTitle}>{getNotification[0].count}</h3></>)}

            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
          </div>
         
        </GridItem>


        <GridContainer>

          <Awaiting Popup={Popup} setPopup={setPopup} />
        </GridContainer>
      </GridContainer>
      <GridContainer>
        <TableList />
      </GridContainer>
    </div>
  );
}
