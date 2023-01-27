import { Box, Typography, Grid, CircularProgress } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import { MainLayout } from "@/components/layouts"
import { CategoryCard } from '@/components/categorys';
import { useCategories } from '@/hooks';

const Home = () => {

  const { categories, isLoading } = useCategories('/categories')

  // estamos probando SWR

  return (
    <MainLayout title="Aprende Vocubulario" description="aprende vocabulario en ingles">
      <Box>
        <Typography variant="h1" fontSize={40} fontWeight={400} color='#494969'>Aprender vocabulario</Typography>
      </Box>

      <Box display='flex' alignItems='flex-end' marginTop={1}>
        <StarIcon style={{ color: '#74C730', marginRight: 5 }} />
        <Typography variant='h2' component='h1' fontSize={20} fontWeight={500} color='#494969' marginRight={1}>50</Typography>
        <Typography variant='h2' component='h1' fontSize={15} fontWeight={100} color='#494969'>Palabras aprendidas</Typography>
      </Box>

      <Typography variant='h3' component='h1' fontSize={20} fontWeight={100} color='#494969' marginTop={3}>Tus listas:</Typography>

      {isLoading ?
        <CircularProgress />
        :
        <Grid container spacing={1} marginTop={1}>
          {categories.map(category => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CategoryCard key={category._id} category={category} />
            </Grid>
          ))}
        </Grid>
      }
    </MainLayout>
  )
}

export default Home