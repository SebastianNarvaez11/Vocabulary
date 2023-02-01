import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography, CircularProgress, Card, CardActionArea, CardContent, Button, Grid, IconButton, LinearProgress } from "@mui/material";
import { MainLayout } from '@/components/layouts'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { confetti } from "@/utils";
import { updateWord } from "@/store/thunks";
import SoundIcon from '@mui/icons-material/GraphicEq';

const VisualPage = () => {

  const { category, isLoading, words } = useAppSelector(state => state.word)

  const router = useRouter()
  const dispatch = useAppDispatch()

  const [position, setPosition] = useState(0)
  const [help, setHelp] = useState(false)



  const playWord = () => {
    let w = new SpeechSynthesisUtterance(words[position].english)
    w.lang = 'en-EN'
    speechSynthesis.speak(w)
  }


  const onHard = async () => {
    const current_points = words[position].points
    if (current_points === 2) {
      await updateWord(words[position]._id!, current_points - 2)
    }

    if (current_points === 1) {
      await updateWord(words[position]._id!, current_points - 1)
    }

    if (current_points === 0) {
      await updateWord(words[position]._id!, current_points)
    }

    setHelp(false)
    setPosition(position + 1)
  }


  const onMedium = async () => {
    const current_points = words[position].points
    await updateWord(words[position]._id!, current_points === 2 ? current_points - 1 : current_points)
    setPosition(position + 1)
    setHelp(false)
  }


  const onEasy = async () => {
    const current_points = words[position].points
    await updateWord(words[position]._id!, current_points === 2 ? 2 : current_points + 1)

    setPosition(position + 1)
    confetti()
    setHelp(false)
  }


  useEffect(() => {
    if (position !== words.length) {
      playWord()
    }
  }, [position, words])


  useEffect(() => {
    if (!category) {
      router.replace('/home')
    }
  }, [category])


  return (
    <MainLayout title='Prueba Visual' description='prueba de vocubulario visual'>

      {!category || isLoading ?
        <CircularProgress />
        :
        <>
          <Typography variant="h1" fontSize={30} fontWeight={400} color='#494969'>{category?.icon} {category?.name}</Typography>

          {position !== words.length ?
            <>
              <Box sx={{ margin: '20px auto', maxWidth: 800 }}>
                <LinearProgress variant="determinate" value={(position * 100) / words.length} sx={{ height: 10, borderRadius: 3, marginBottom: 2 }} />

                <Card onClick={() => setHelp(true)}>
                  <CardActionArea sx={{ padding: 2 }}>
                    <CardContent>
                      <Typography align='center' fontWeight={help ? 200 : 400} variant="h1" component="h1" sx={{ fontSize: { xs: 30, sm: 40, md: 60 } }}>
                        {words[position].english}
                      </Typography>

                      {help &&
                        <Typography align='center' fontWeight={600} variant="h5" component="h5" sx={{ fontSize: { xs: 30, sm: 40, md: 60 } }}>
                          {words[position].english}
                        </Typography>
                      }
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>


              <Box sx={{ margin: '5px auto', maxWidth: 800 }}>
                <IconButton onClick={playWord} color="success" sx={{ marginTop: 2 }}>
                  <SoundIcon />
                </IconButton>

                <Grid container marginTop={1} spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <Button fullWidth color='error' variant="contained" onClick={onHard}>
                      Dificil
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button fullWidth color='primary' variant="contained" onClick={onMedium}>
                      Medio
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button fullWidth color='success' variant="contained" onClick={onEasy}>
                      Facil
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </>

            :
            <Box display='flex' flexDirection='column' alignItems='center' >
              <Typography variant="h3" marginBottom={4} marginTop={10}>¡Felicitaciones!</Typography>
              <Button variant="contained" onClick={() => router.push('/home')}>
                Regresar
              </Button>
            </Box>
          }
        </>
      }
    </MainLayout>
  )
}

export default VisualPage