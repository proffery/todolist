import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';

type FormikErrorType = {
    email?: string
    password?: string
}

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            console.log(JSON.stringify(values));
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Password must be longer than 3'
            }
            console.log(errors);

            return errors
        },
    })
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <form onSubmit={formik.handleSubmit}>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            id="email"
                            type="email"
                            label="Email"
                            margin="normal"
                            {... formik.getFieldProps('email')}
                            error={!!formik.errors.email && formik.touched.password}
                            helperText={formik.errors.email}
                            autoComplete={'off'}
                        />
                        <TextField
                            id="password"
                            type="password"
                            label="Password"
                            margin="normal"
                            {... formik.getFieldProps('password')}
                            error={!!formik.errors.password && formik.touched.password}
                            helperText={formik.errors.password}
                            autoComplete={'off'}
                        />
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {... formik.getFieldProps('rememberMe')}
                            />} />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}