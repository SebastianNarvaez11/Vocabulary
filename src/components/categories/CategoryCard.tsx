import { FC, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { ICategory } from "@/interfaces"
import { useAppDispatch } from "@/store/hooks"
import { set_category } from "@/store/slices/wordSlice"
import { getWords } from "@/store/thunks"
import { Box, Button, Card, CardActionArea, CardContent, LinearProgress, Typography } from "@mui/material"
import EasyIcon from '@mui/icons-material/CheckBoxRounded';
import MediumIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import HardIcon from '@mui/icons-material/DisabledByDefaultRounded';


interface Props {
    category: ICategory
}

export const CategoryCard: FC<Props> = ({ category }) => {

    const [isActivate, setIsActivate] = useState(false)
    const router = useRouter()

    const dispatch = useAppDispatch()

    const onSetCategory = async (url: string) => {
        const isSuccess = await dispatch(getWords(category._id!))
        if (isSuccess) {
            dispatch(set_category(category))
            router.push(`/tests${url}`)
        }
    }

    const easy = useMemo(() => category.words?.filter(word => word.points === 2).length, [category])
    const medium = useMemo(() => category.words?.filter(word => word.points === 1).length, [category])
    const hard = useMemo(() => category.words?.filter(word => word.points === 0).length, [category])
    const totalPoints = category.words?.reduce((acc, word) => acc + word.points, 0);

    return (
        <>{!isActivate ?
            <Card className="animate__animated animate__flipInX" sx={{ borderRadius: 3, margin: 1 }}>
                <CardActionArea onClick={() => setIsActivate(true)}>
                    <CardContent sx={{ padding: '10px 10px 10px 0px' }}>
                        <Box display='flex'>
                            <Box flex={1} alignSelf="center">
                                <Typography fontSize={60} align="center">{category.icon}</Typography>
                            </Box>
                            <Box flex={2}>
                                <Typography fontSize={15} fontWeight={500}>
                                    {category.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {category.words?.length} Palabras
                                </Typography>

                                {/* (la cantidad de actual puntos totales / la cantidad total de puntos posibles) * 100 */}
                                <LinearProgress variant="determinate" color="success" value={(totalPoints! / (category.words?.length! * 2)) * 100} sx={{ height: 8, borderRadius: 5 }} />

                                <Box display='flex' marginTop={1}>
                                    <Box display='flex' flex={1} alignItems='end'>
                                        <Typography variant="body2" color="text.secondary">{easy}</Typography>
                                        <EasyIcon sx={{ color: '#9ACC62' }} />
                                    </Box>
                                    <Box display='flex' flex={1} alignItems='end'>
                                        <Typography variant="body2" color="text.secondary">{medium}</Typography>
                                        <MediumIcon sx={{ color: '#5A95E2' }} />
                                    </Box>
                                    <Box display='flex' flex={1} alignItems='end'>
                                        <Typography variant="body2" color="text.secondary">{hard}</Typography>
                                        <HardIcon sx={{ color: '#E35260' }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
            :
            <Card className="animate__animated animate__flipInY" sx={{ borderRadius: 3, margin: 1 }} onClick={() => setIsActivate(false)}>
                <CardContent sx={{ padding: '10px 15px 10px 15px' }}>
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' alignItems='center' justifyContent='center'>
                            <Typography fontSize={30} align="center">{category.icon}</Typography>
                            <Typography fontSize={15} fontWeight={500}>{category.name}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='space-around' marginTop={2}>
                            <Button variant="outlined" fullWidth sx={{ mr: 1 }} onClick={() => onSetCategory('/written')}>
                                Escrito
                            </Button>
                            <Button variant="outlined" fullWidth sx={{ ml: 1 }} onClick={() => onSetCategory('/visual')}>
                                Visual
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        }
        </>
    )
}
