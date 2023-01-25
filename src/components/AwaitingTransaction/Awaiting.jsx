import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/TransactionTable";
import { useDispatch, useSelector } from "react-redux";
import TransactionPopup from "../../components/Popup/Popup";
import Dialog from "@mui/material/Dialog";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0px",
    textDecoration: "none",
  },
  button: {
    border: "none",
    boxShadow: "2px 2px 7px #552361",
    background: "#9c35b3",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile({ Popup, setPopup }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [popUpData, setPopupData] = React.useState([]);
  const dispatch = useDispatch();
  const { getNewTransactions } = useSelector((state) => ({
    getNewTransactions: state.user.getNewTransactions,
  }));
  useEffect(() => {
    dispatch({ type: "GET_NEW_TRANSACTION" });
  }, []);
  const classes = useStyles();
  const getTableData = () =>
    getNewTransactions.map((user) => [
      user.id,
      user.user_id,
      user.amount,
      user.transaction_type,
      user.status,
      new Date(user.created).toLocaleString(),
    ]);
  return (
    <div>
      <Dialog
        onClose={() => {
          setPopup(false);
        }}
        open={Popup}
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* */}

                  <h4 className={classes.cardTitleWhite}>
                    {" "}
                    Awaiting Transactions
                  </h4>

                  {/* <Button style={{color:"white", fontSize:"14px",height:"40px"}}  className={classes.button} onClick={() => { setShowPopupOne(true)}}>Create Transaction</Button> */}
                </div>
              </CardHeader>
              <CardBody>
                {getNewTransactions.length != 0 ? (
                  <>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={[
                        "Id",
                        "UserId",
                        "Amount",
                        "Transaction Type",
                        "Status",
                        "Created",
                      ]}
                      tableData={getTableData()}
                      setShowPopup={setShowPopup}
                      setPopupData={setPopupData}
                    />
                  </>
                ) : (
                  <h4>No Transaction Found </h4>
                )}
              </CardBody>
            </Card>
            {/* <TransactionPopup1 showPopup={showPopup1}  userId={id} setShowPopup={setShowPopupOne}/> */}
            <TransactionPopup
              showPopup={showPopup}
              popUpData={popUpData}
              setShowPopup={setShowPopup}
            />
          </GridItem>
        </GridContainer>
      </Dialog>
    </div>
  );
}
