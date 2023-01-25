import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "react-responsive-pagination";
// core components
import { Formik } from "formik";
import * as Yup from "yup";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useDispatch, useSelector } from 'react-redux'
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

const styles = {
  inputFields: {

    boxSizing: "border-box",
    size: "small",
    borderRadius: "5px",
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { users } = useSelector(state => ({ users: state.user.users }))
  const [currentPage,setCurrentPage] = React.useState(1)
  const [searchData, setSearchData] = React.useState()
  const [userData, setUserData] = React.useState()
  const searchHandle = (values) => {


    const searchedMovies = searchData.filter((item) => item.firstname.toLowerCase().includes(values.email));
    setUserData(searchedMovies)


  }



  useEffect(() => {
    dispatch({ type: "Get_USERS" })

  }, [])


  useEffect(() => {
    setSearchData(users)

  }, [users])

  const getSearchTableData = () => userData.map(user => ([user.id, user.firstname, user.lastname, user.email, user.balance, parseFloat(user.interest).toFixed(4)]))
  const getTableData = () => users.map(user => ([user.id, user.firstname, user.lastname, user.email, user.balance, parseFloat(user.interest).toFixed(9)]))
  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  const pageSize = 10;
  return (
    <GridContainer>
       <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"/>
            <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
            </head>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <h4 className={classes.cardTitleWhite}>Users Table</h4>


                <div  >
                <Formik
                  initialValues={{ email: "", }}
                  onSubmit={async values => {

                    searchHandle(values)

                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()

                      .required("Required"),

                  })}
                >
                  {props => {
                    const {
                      values,
                      touched,
                      errors,

                      handleChange,
                      handleBlur,
                      handleSubmit,

                    } = props;
                    return (
                      <form style={{ display: "flex", alignItems: "flex-start" }} onSubmit={handleSubmit}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <TextField
                            className={classes.inputFields}

                            margin="normal"
                            placeholder="search"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size="small"
                            type="text"
                            id="email"
                            fullWidth

                          />
                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                        </div>
                        <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                          <Button type="submit" color="white" aria-label="edit" justIcon round >
                            <Search color="white" />
                          </Button>
                        </div>




                      </form>
                    );
                  }}
                </Formik>
                {/* <CustomInput
                  formControlProps={{
                    className: + " " + classes.search,
                  }}
                  inputProps={{
                    placeholder: "Search",
                    inputProps: {
                      "aria-label": "Search",
                    },
                  }}
                />
                <Button color="white" aria-label="edit" justIcon round onClick={searchHandle}>
                  <Search color="white" />
                </Button> */}

              </div>

            </div>

          </CardHeader>

          {userData ? (<>

            <CardBody>
              {users.length != 0 ? (<> <Table
                tableHeaderColor="primary"
                tableHead={["Id", "First Name", "Last Name", "Email", "Balance", "Interest"]}
                tableData={getSearchTableData()}
              /> </>) : null}

            </CardBody>
          </>) : (<><CardBody>
            {users.length != 0 ? (<> <Table
              tableHeaderColor="primary"
              tableHead={["Id", "First Name", "Last Name", "Email", "Balance", "Interest"]}
              tableData={paginate(getTableData(),pageSize,currentPage)}
            /> </>) : <><h4>
              No Data found
            </h4>
            </>}

          </CardBody></>)}


          <Pagination current={currentPage} total={Math.ceil(users.length/pageSize)} onPageChange={(value) => setCurrentPage(value)} />
        </Card>
      </GridItem>

    </GridContainer>
  );
}
