import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios"
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import LogoDark2 from "../../assest/LogoDark2.png";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { isLoggedIn } from "../../utils";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundColor: '#F4F7FF',
    },
    image: {
        backgroundColor: "#F4F7FF",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        alignItems: "center",
    },
    greyText: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "21px",
        textAlign: "left",
        color: "rgba(0, 0, 0, 0.4)",
    },
    inputFields: {

        boxSizing: "border-box",
        size: "small",
        borderRadius: "5px",
    },
    circularButton: {
        padding: "10px 40px",

        background: "#0D0D2B",
        borderRadius: "50px",
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "14px",
        color: "#ffffff",
    },
    gridItems: {
        margin: "5px, 5px",
    },
    cards: {
        width: "412px",
        height: "477px",
        margin: "auto",
        padding: "20px",
        flexDirection: "column",
        background: "#FFFFFF",
        borderRadius: "10px",
    },
    links: {
        textDecoration: "none"
        , color: "#0D0D2B"
    }
}));


export default function ForgetPassword() {

    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { login } = useSelector(state => state.user)
    console.log(login, "login STATT")
    const notify = (message) => {
        toast.success(message);
    }

    function API(values) {
        dispatch({ type: "LOGIN", values })


    }

    if (isLoggedIn()) {
        return <Redirect to="/dashboard" />
    }
    return (<Grid
        container
        component="main"
        className={classes.root}
        alignItems="center"
    >
        <CssBaseline />

        <Grid item xs={12} sm={8} md={12} >
            <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', maxWidth: '200px', margin: "10px auto " }}>
                {/* <img src={LogoDark2} alt="Logo" style={{ maxWidth: "90px" }} /> */}
                <Typography component="h1" variant="h5" style={{ color: '#0D0D2B', margin: '34px auto', fontWeight: '600' }}>
                    Reset Password
                </Typography>
            </div>
            <Card className={classes.cards} style={{ height: 'auto' }}>
                <Formik
                    initialValues={{ email: "" }}
                    onSubmit={async values => {
                        console.log(values, "Values")
                        dispatch({ type: "FORGET_PASS", values })
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email()
                            .required("Required"),
                    })}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <Typography className={classes.greyText}>Email</Typography>
                                <TextField
                                    className={classes.inputFields}
                                    variant="outlined"
                                    margin="normal"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    id="email"
                                    fullWidth
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}

                                <Button


                                    variant="contained"
                                    className={classes.circularButton}
                                    type="submit"
                                    // disabled={isSubmitting}
                                    style={{ display: "block", margin: "40px auto" }}
                                >
                                    Send Reset Link
                                </Button>
                                <ToastContainer />
                            </form>
                        );
                    }}
                </Formik>
            </Card>
        </Grid>
    </Grid>
    );
}
