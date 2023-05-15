import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Button } from "@material-ui/core";
import { TextField, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import styles from "./styles/registerStyles";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


const Register = ({ isAuthenticated, onRegister, values, history }) => {

  const { from } = { from: { pathname: "/" } };
  const [open, setOpen] = React.useState(true);
  const [success, setSuccess] = useState(null);
  const [errorExists, setErrorStatus] = useState(null);
  const [shouldRedirect, shouldSetRedirect] = useState(null);

  if (isAuthenticated) {
    history.replace(from);
  }

  useEffect(() => {
    if (success) {
      alert("User Created Successfully!");
    }
  }, [shouldRedirect]);


  const btnStyle = { marginTop: 10 }
  const phoneRegExp = /^[2-9]{1}[0-9]{8}/
  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+).{8,64}$/

  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Name should be more than 2 characters").required("Required").max(64, "Name should be less than 64 characters").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
    email: Yup.string().email("Enter valid email").required("Required"),
    phoneNumber: Yup.string().matches(phoneRegExp, "Enter valid Phone number").required("Required").max(10, "Mobile number should not be greater than 10 digit"),
    password: Yup.string().min(8, "Minimum characters should be 8")
      .matches(passwordRegExp, "Password must have one upper, lower case, number, special symbol").required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matches").required('Required')
  })

  const classes = styles();

  const onSubmit = async (values, props) => {

    const payload = {
      name: values.name,
      email: values.email,
      mobileNumber: values.phoneNumber,
      password: values.password,
      reenterPassword: values.password

    };


    try {
      const response = await onRegister(payload);
      setErrorStatus(false);
      setSuccess(true);
      shouldSetRedirect(true);
    } catch {
      setSuccess(false);
      setErrorStatus(true);
    }
    props.resetForm();

  };

  return (
    <div className={classes.registerContainer} >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(props) => (
          <Form noValidate>

            <Field as={TextField} name='name' label='Name' fullWidth
              error={props.errors.name && props.touched.name}
              inputProps={{ "data-testid": "name" }}
              helperText={<ErrorMessage name='name' />} required />


            <Field as={TextField} name='email' label='Email' fullWidth
              error={props.errors.email && props.touched.email}
              inputProps={{ "data-testid": "email" }}
              helperText={<ErrorMessage name='email' />} required />


            <div className={classes.countryCode}>
              <Typography variant="body1"  >
                +91-
              </Typography>
              <Field as={TextField} name="phoneNumber" label='Phone Number' fullWidth
                error={props.errors.phoneNumber && props.touched.phoneNumber}
                inputProps={{ "data-testid": "phoneNumber" }}
                helperText={<ErrorMessage name='phoneNumber' />} required />

            </div>

            <Field as={TextField} name='password' label='Password' type='password' fullWidth
              error={props.errors.password && props.touched.password}
              inputProps={{ "data-testid": "password" }}
              helperText={<ErrorMessage name='password' />} required />

            <Field as={TextField} name='confirmPassword' label='Confirm Password' type='password' fullWidth
              error={props.errors.confirmPassword && props.touched.confirmPassword}
              inputProps={{ "data-testid": "confirmPassword" }}
              helperText={<ErrorMessage name='confirmPassword' />} required />

            <Button type='submit' style={btnStyle} variant='contained' data-testid="registerButton"
              color='primary'>Register</Button>


            {errorExists && <Collapse in={open}>
              <Alert severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Error While Registration
              </Alert>
            </Collapse>}

          </Form>
        )}
      </Formik>

    </div>
  );
}

export default Register;