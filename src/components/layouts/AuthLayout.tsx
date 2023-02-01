import Head from "next/head"
import { FC, ReactNode } from "react"
import { Box } from '@mui/material'
import { Toaster } from 'react-hot-toast';

interface Props {
    title: string,
    description: string,
    children: ReactNode
}

export const AuthLayout: FC<Props> = ({ children, description, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />

                <meta name="og:title" content={title} />
                <meta name="og:description" content={description} />
            </Head>

            <Box sx={{ margin: '80px auto', paddingLeft: { xs: '15px', sm: '60px' }, paddingRight: { xs: '20px', sm: '60px' }, maxWidth: 1440, minWidth: 370 }}>
                <Toaster position="top-right" />
                {children}
            </Box>
        </>
    )
}
