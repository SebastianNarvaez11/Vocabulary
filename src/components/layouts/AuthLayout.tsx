import Head from "next/head"
import { FC, ReactNode } from "react"
import { Box } from '@mui/material'

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

            <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
                {children}
            </Box>
        </>
    )
}
