import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from './Form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='1rem 6%'
        textAlign='center'
      >
        <Typography fontWeight='bold' fontSize='32px' color='neutral'>
          My social Media 3000, I am still working on optimizing the cold start after clicking the login button, if this page hasnt been active for a while it could take up to 1 minute to load, thanks for your comprehension
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight='600' variant='h5' sx={{ mb: '1.5rem' }}>
          Welcome to my social media 3000, login and explore this platform
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage
