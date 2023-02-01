import Link from "next/link"

import { LogoutOutlined, ArrowBack } from "@mui/icons-material"
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material"
import { useAppSelector } from "@/store/hooks"
import Cookies from "js-cookie"
import { useRouter } from "next/router"



export const Navbar = () => {

    const { user } = useAppSelector(state => state.auth)

    const router = useRouter()

    const onLogout = () => {
        Cookies.remove('token')
        router.reload()
    }

    return (
        <AppBar elevation={0} position='fixed' style={{ backgroundColor: 'white', height: 60 }}>
            <Toolbar >

                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Link href="/home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Typography fontSize={25} fontWeight={400} color='#494969' variant="h6">Vocubulary</Typography>
                    </Link>
                </Box>

                <IconButton sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={() => router.push('/home')}>
                    <ArrowBack />
                    <Typography color='#494969' marginLeft={1}>Regresar</Typography>
                </IconButton>


                <Box flex={1} />


                <Link href="/profile" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginRight: 20 }}>
                    <Typography color='#494969'>{user?.name}</Typography>
                </Link>


                <IconButton onClick={onLogout}>
                    <LogoutOutlined />
                </IconButton>

            </Toolbar>
        </AppBar>
    )
}
