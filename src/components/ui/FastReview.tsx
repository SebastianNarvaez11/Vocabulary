import { FC, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { ICategory } from "@/interfaces"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { set_category } from "@/store/slices/wordSlice"
import { getEasyWordsForReview } from "@/store/thunks"
import { Box, Button, Card, CardActionArea, CardContent, CircularProgress, Typography } from "@mui/material"


export const FastReview = () => {

    const { isLoading } = useAppSelector(state => state.word)
    const [isActivate, setIsActivate] = useState(false)
    const router = useRouter()

    const dispatch = useAppDispatch()

    const onSetCategory = async (url: string) => {
        const isSuccess = await dispatch(getEasyWordsForReview())
        if (isSuccess) {
            const category = { icon: '🚀', name: 'Repaso Rapido' }
            dispatch(set_category(category))
            router.push(`/tests${url}`)
        }
    }

    return (
        <>{!isActivate ?
            <Card className="animate__animated animate__flipInX" sx={{ borderRadius: 3, margin: 1 }}>
                <CardActionArea onClick={() => setIsActivate(true)}>
                    <CardContent sx={{ padding: '5px 0px 5px 0px' }}>
                        <Box display='flex' alignItems='center' sx={{ width: { xs: 150, sm: 200 } }}>
                            {!isLoading ?
                                <>
                                    <Box flex={1} alignSelf="center">
                                        <Typography fontSize={30} align="center">🚀</Typography>
                                    </Box>
                                    <Box sx={{ flex: { xs: 1, sm: 2 } }} >
                                        <Typography fontSize={15} fontWeight={500}>
                                            Repaso Rapido
                                        </Typography>
                                    </Box>
                                </>
                                :
                                <CircularProgress />
                            }
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
            :
            <Card className="animate__animated animate__flipInY" sx={{ borderRadius: 3, padding: 1, margin: 1 }} onClick={() => setIsActivate(false)}>
                <Box display='flex' justifyContent='space-around' sx={{ width: { xs: 150, sm: 200 } }}>
                    {!isLoading ?
                        <>
                            <Button variant="outlined" size="small" fullWidth sx={{ mr: 1 }} onClick={() => onSetCategory('/written')}>
                                Escrito
                            </Button>
                            <Button variant="outlined" size="small" fullWidth sx={{ ml: 1 }} onClick={() => onSetCategory('/visual')}>
                                Visual
                            </Button>
                        </>
                        :
                        <CircularProgress />
                    }
                </Box>
            </Card>
        }
        </>
    )
}
