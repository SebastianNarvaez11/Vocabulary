import { KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography, CircularProgress, Card, CardActionArea, CardContent, TextField, Button, LinearProgress } from "@mui/material";
import { MainLayout } from '@/components/layouts'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ImageCard } from "@/components/categories";
import { confetti, isDuplicate } from "@/utils";
import { updateWord } from "@/store/thunks";
import { add_word } from "@/store/slices/wordSlice";

const WrittenPage = () => {

  const { category, isLoading, words } = useAppSelector(state => state.word)

  const router = useRouter()
  const dispatch = useAppDispatch()

  const [position, setPosition] = useState(0)
  const [inputValue, setInpuValue] = useState('')
  const [help, setHelp] = useState(false)


  const onInputChange = async (value: string) => {
    setInpuValue(value)
    if (value === words[position].english) {
      if (!isDuplicate(words, words[position]._id!)) {
        const current_points = words[position].points
        await updateWord(words[position]._id!, current_points === 2 ? 2 : current_points + 1)
      }
      playWord()
      setPosition(position + 1)
      setInpuValue('')
      setHelp(false)
      confetti()
    }
  }


  const onInputKeyDown = async (event: KeyboardEvent<HTMLDivElement>) => {
    if (!help && event.key === 'Enter') {
      setHelp(true)
      const current_points = words[position].points
      await updateWord(words[position]._id!, current_points === 0 ? 0 : current_points - 1)
      dispatch(add_word(words[position]))
    }
  }


  const onClickHelp = async () => {
    if (!help) {
      setHelp(true)
      const current_points = words[position].points
      await updateWord(words[position]._id!, current_points === 0 ? 0 : current_points - 1)
      dispatch(add_word(words[position]))
    }
  }


  const playWord = () => {
    let w = new SpeechSynthesisUtterance(words[position].english)
    w.lang = 'en-EN'
    speechSynthesis.speak(w)
  }


  useEffect(() => {
    if (!category) {
      router.replace('/home')
    }
  }, [category])



  return (
    <MainLayout title='Prueba Escrita' description='prueba de vocubulario escrito'>

      {!category || isLoading ?
        <CircularProgress />
        :
        <>
          <Typography variant="h1" sx={{ fontSize: { xs: 20, sm: 30 } }} fontWeight={400} color='#494969'>{category?.icon} {category?.name}</Typography>
          <Box display='flex' marginTop={2} onKeyDown={onInputKeyDown}>
            <Box sx={{ margin: '0px auto', maxWidth: 800 }}>
              <LinearProgress variant="determinate" value={(position * 100) / words.length} sx={{ height: 10, borderRadius: 3, marginBottom: 2 }} />
              {position !== words.length ?
                <>
                  <Card>
                    <CardActionArea onClick={onClickHelp}>
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ImageCard word={words[position]} />

                        <Typography align='center' fontWeight={help ? 200 : 400} variant="h5" component="h5" sx={{ fontSize: { xs: 25, sm: 40 }, marginTop: 2 }}>
                          {words[position].spanish}
                        </Typography>

                        {help &&
                          <Typography align='center' fontWeight={600} variant="h5" component="h5">
                            {words[position].english}
                          </Typography>
                        }
                      </CardContent>
                    </CardActionArea>
                  </Card>

                  <TextField
                    placeholder={`Traduce`}
                    autoComplete='off'
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value.toLowerCase())}
                    sx={{ marginTop: 2, width: '100%' }}
                    inputProps={{ style: { textTransform: "lowercase" } }}
                  />


                  <Typography variant='body2' color="text.secondary" marginTop={2}>
                    Si no la sabes, presiona la tecla Enter o haz clic en la imagen para ver la respuesta
                  </Typography>
                </>
                :
                <Box display='flex' flexDirection='column' alignItems='center' >
                  <Typography variant="h3" marginBottom={4} marginTop={10}>¡Felicitaciones!</Typography>
                  <Button variant="contained" onClick={() => router.push('/home')}>
                    Regresar
                  </Button>
                </Box>
              }
            </Box>
          </Box>
        </>
      }
    </MainLayout>
  )
}

export default WrittenPage