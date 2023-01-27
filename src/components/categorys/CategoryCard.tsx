import { ICategory } from "@/interfaces"
import { Box, Card, CardActionArea, CardContent, LinearProgress, Typography } from "@mui/material"
import { FC } from "react"


interface Props {
    category: ICategory
}

export const CategoryCard: FC<Props> = ({ category }) => {
    return (
        <Card sx={{ borderRadius: 3, margin: 1 }}>
            <CardActionArea>
                <Box display='flex'>
                    <Box flex={1} alignSelf="center">
                        <Typography fontSize={50} align="center">{category.icon}</Typography>
                    </Box>
                    <Box flex={2}>
                        <CardContent>
                            <Typography fontSize={15} fontWeight={500}>
                                {category.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {category.wordCount}
                            </Typography>
                            <LinearProgress variant="determinate" value={40} />
                        </CardContent>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
