import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Box, Grid, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '@/components/layouts';
import { useAppDispatch } from '@/store/hooks';
import { loginUser } from '@/store/thunks';
import { isEmail, isValidToken } from '@/utils';



type FormData = {
    email: string,
    password: string
}


const LoginPage = () => {

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()


    const onLogin = async ({ email, password }: FormData) => {
        setIsLoading(true)

        const isSuccessLogin = await dispatch(loginUser(email, password))
        if (isSuccessLogin) {
            const page_destination = router.query.p?.toString() || '/home'
            router.replace(page_destination)
        } else {
            setIsLoading(false)
        }
    }

    return (
        <AuthLayout title="Iniciar Sesion" description='Inicia sesion para aprender vocabulario en ingles'>
            <Box sx={{ margin: '20px auto', maxWidth: 400 }}>
                <form onSubmit={handleSubmit(onLogin)} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1" sx={{ fontSize: { xs: 30, sm: 40, md: 60 } }}>Iniciar Sesión</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label="Correo"
                                variant="filled"
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='center'>
                            {isLoading ?
                                <CircularProgress />
                                :
                                <Button color="primary" size='large' variant="outlined" fullWidth type='submit'>
                                    Ingresar
                                </Button>
                            }
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <Link href={router.query.p ? `/auth/register?p=${router.query.p}` : `/auth/register`} >
                                ¿No tienes cuenta?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </AuthLayout>

    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { token = '' } = req.cookies
    const { p = '/home' } = query

    const is_valid = await isValidToken(token)

    if (is_valid) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return { props: {} }
}



export default LoginPage