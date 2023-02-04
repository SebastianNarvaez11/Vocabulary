import { NextPage } from "next"

import { Typography, Box, Button } from "@mui/material"
import { AuthLayout } from "@/components/layouts"
import { useRouter } from "next/router"

const Page404: NextPage = () => {

    const router = useRouter()
    
    return (
        <AuthLayout title="Pagina no encontrada" description="la pagina que estas buscando no existe">
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                <Typography variant="h1" component='h1' fontSize={60} fontWeight={200}>404 |</Typography>
                <Typography marginLeft={2}>No encontramos ninguna pagina aqui</Typography>

            </Box>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button variant="contained" onClick={() => router.push('/auth/login')}>
                    Regresar
                </Button>
            </Box>
        </AuthLayout>
    )
}

export default Page404