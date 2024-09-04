import React, {useState} from 'react';
import {Box, TextField, Typography, Button} from '@mui/material'

function UserLogin(props) {

    const [Username, setUsername] = useState('')

    async function login() {
        try{
            const response = await fetch('https://api.sleeper.app/v1/user/' + Username)
            if (!response.ok){
                throw new Error('Login Error')
            }
            const data = await response.json()
            props.setUserID(data.user_id)
        } catch (error){
            console.error('Error:', error)
        }
    }

    function handleUsernameInput(event){
        setUsername(event.target.value)
    }

    return (
    <Box
        sx={{
            width: '100%',
            maxWidth: '400px',
            margin: 'auto',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#fff',
        }}
    >
        <Typography
            variant="h5" 
            component="h1" 
            gutterBottom 
            sx={{ 
                fontWeight: 'bold', 
                color: '#3f51b5' 
            }}
        >
            Sleeper User Name
        </Typography>
        <TextField 
            id="outlined-basic" 
            label="Outlined" 
            variant="outlined" 
            onChange={(event) => handleUsernameInput(event)}
            fullWidth
            margin='normal'
        />
        <Button 
            variant="contained" 
            onClick={(event) => login()}
            fullWidth 
            color="primary" 
            sx={{ 
                marginTop: '1rem', 
                padding: '0.75rem' 
            }} 
        >
            Log In
        </Button>
    </Box>
    )
}

export default UserLogin