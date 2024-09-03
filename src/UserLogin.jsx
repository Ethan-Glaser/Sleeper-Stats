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
    <Box>
        <Typography>Sleeper User Name</Typography>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(event) => handleUsernameInput(event)}/>
        <Button variant="contained" onClick={(event) => login()}>Log In</Button>
    </Box>
    )
}

export default UserLogin