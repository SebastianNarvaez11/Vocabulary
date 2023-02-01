import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { AuthLayout } from "@/components/layouts"
import { Box, Button, Grid, TextField, Typography, CircularProgress } from "@mui/material"
import { useForm } from "react-hook-form"
import { isEmail, isValidToken } from "@/utils"
import { useAppDispatch } from "@/store/hooks"
import { registerUser } from "@/store/thunks"
import { useState } from "react"
import Link from "next/link"

interface FormData {
    name: string,
    email: string,
    password: string
}

const RegisterPage = () => {

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()


    const onRegister = async ({ name, email, password }: FormData) => {
        setIsLoading(true)
        const isSuccessRegister = await dispatch(registerUser(name, email, password))
        if (isSuccessRegister) {
            const page_destination = router.query.p?.toString() || '/home'
            router.replace(page_destination)
        } else {
            setIsLoading(false)
        }

    }


    return (
        <AuthLayout title="Registrarse" description="Registrate para aprender vocabulario en ingles">
            <form onSubmit={handleSubmit(onRegister)} noValidate>
                <Box sx={{ margin: '20px auto', maxWidth: 400 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" sx={{ fontSize: { xs: 30, sm: 40, md: 60 } }}>Registrarse</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Nombre completo"
                                variant="filled"
                                fullWidth
                                {...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Minimo 2 caracteres' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Correo"
                                variant="filled"
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message} />
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
                                    Registrarse
                                </Button>
                            }
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <Link href={router.query.p ? `/auth/login?p=${router.query.p}` : `/auth/login`}>
                                ¿Ya tienes cuenta?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </form>
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


export default RegisterPage