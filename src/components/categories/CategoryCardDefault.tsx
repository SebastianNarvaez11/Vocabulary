import { FC, useState } from "react"
import { useRouter } from "next/router"
import { ISeedCategory } from "@/interfaces"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { createCategoryBySeed } from "@/store/thunks"
import { Box, Button, Card, CardActionArea, CardContent, Typography, CircularProgress } from "@mui/material"


interface Props {
    category: ISeedCategory
}

export const CategoryCardDefault: FC<Props> = ({ category }) => {

    const { isLoading } = useAppSelector(state => state.word)
    const [isHover, setIsHover] = useState(false)
    const router = useRouter()

    const dispatch = useAppDispatch()

    const onSetCategory = async () => {
        const isSuccess =  await dispatch(createCategoryBySeed(category._id))
        if(isSuccess) return router.push(`/tests/written`)
    }

    return (
        <Card className="animate__animated animate__fadeIn" sx={{ borderRadius: 3, margin: 1 }}>
            <CardActionArea sx={{ cursor: 'default' }} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <CardContent sx={{ padding: '10px 10px 10px 0px' }}>
                    <Box display='flex'>
                        <Box flex={1} alignSelf="center">
                            <Typography fontSize={40} align="center">{category.icon}</Typography>
                        </Box>
                        <Box flex={2}>
                            <Typography fontSize={18} fontWeight={400}>
                                {category.name}
                            </Typography>
                            {
                                !isHover ?
                                    <Typography className="animate__animated animate__fadeIn" variant="body2" color="text.secondary" fontSize={15}>
                                        {category.words?.length} Palabras
                                    </Typography>
                                    :
                                    <>
                                        {isLoading ?
                                            <CircularProgress />
                                            :
                                            < Button className="animate__animated animate__fadeIn" variant="outlined" fullWidth onClick={onSetCategory}>
                                                Aprender
                                            </Button>
                                        }
                                    </>
                            }
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card >
    )
}
