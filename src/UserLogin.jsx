import React, {useState} from 'react';
import {TextField, Typography, Button} from '@mui/material'
import ContentBox from './style/ContentBox';

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
    <ContentBox
        sx={{
            width: '100%',
            maxWidth: '400px',
            margin: 'auto',
        }}
    >
        <Typography
            variant="h5" 
            component="h1" 
            gutterBottom 
            textAlign='center'
            sx={{ 
                fontWeight: 'bold', 
                color: 'text.primary',
                mb:1 
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
            onClick={() => login()}
            fullWidth 
            sx={{ 
                marginTop: '1rem', 
                padding: '0.75rem',
                backgroundColor: 'alt.main' 
            }} 
        >
            Log In
        </Button>
    </ContentBox>
    )
}

export default UserLogin