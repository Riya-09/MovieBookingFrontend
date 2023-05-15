import React , {useEffect,useState} from 'react'
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import changePasswordService from './services/changePasswordService'
import { useHistory } from "react-router-dom"

const RegistrationForm = ({onLogout}) => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }
    const passwordRegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+).{8,64}$/
    const initialValues = {
        password:'',
        newPassword: '',
        confirmPassword:''
    }

    let history = useHistory()

    const [shouldRedirect, shouldSetRedirect] = useState(null);


    useEffect(() => {

          console.log("+history");
          //history.push('/login');

      },[shouldRedirect]);

    const validationSchema = Yup.object().shape({
        
  
        password: Yup.string().required('Required'),

        // password: Yup.string().min(8, "Minimum characters should be 8")
        // .matches(passwordRegExp,"Password must have one upper, lower case, number, special symbol").required('Required'),

        newPassword:Yup.string().min(8, "Minimum characters should be 8")
        .max(64,"Maximum character should be 64")
        .matches(passwordRegExp,"Password must have one upper, lower case, number, special symbol").notOneOf([Yup.ref('password')],"Password should not match Old password").required('Required'),

        confirmPassword:Yup.string().oneOf([Yup.ref('newPassword')],"Those passwords didn’t match. Try again.").required('Required')
    })




    const onSubmit = async (values, props) => {

        

        const payload = {
            currentPassword: values.password,
            newPassword: values.newPassword
          };

          try{
            const response = await changePasswordService.create(payload);

            console.log(response)
            alert("Your Password Changed Successfully")
            props.resetForm()
            onLogout();
            history.push('/');

          }catch(error){
                console.log("Post failed");
                console.log(error.response);
                alert(error.response.data.details);
          }finally{
              console.log("finally");
              //this.props.history.push('/');
              //shouldSetRedirect(true);
          }



    };
    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='center'>
                    {/* <Typography variant='caption'>Change Password</Typography> */}
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form noValidate>

                            <Field as={TextField} name='password' label='Current Password' type='password' fullWidth
                                error={props.errors.password && props.touched.password}
                                helperText={<ErrorMessage name='password' />} required />


                            <Field as={TextField} name='newPassword' label='New password' type='password' fullWidth
                                error={props.errors.password && props.touched.password}
                                helperText={<ErrorMessage name='newPassword' />} required />

                            <Field as={TextField} name='confirmPassword' label='Confirm New Password' type='password' fullWidth
                                error={props.errors.confirmPassword && props.touched.confirmPassword}
                                helperText={<ErrorMessage name='confirmPassword' />} required />

                            <Button type='submit' style={btnStyle} variant='contained'
                                color='primary'>Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default RegistrationForm;