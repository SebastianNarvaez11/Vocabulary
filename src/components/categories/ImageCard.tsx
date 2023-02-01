import { FC } from "react"
import { CardMedia } from "@mui/material"
import { IWord } from "@/interfaces"

interface Props {
    word: IWord
}

export const ImageCard: FC<Props> = ({word}) => {
    return (
        <CardMedia
            component="img"
            sx={{height: 200, width: 300}}
            image={word.image} 
            alt={word.english}
        />
    )
}
