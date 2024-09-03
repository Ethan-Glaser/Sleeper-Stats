import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {AppBar, Container, Toolbar, Typography, Box, Menu, MenuItem, Tooltip, IconButton, Avatar, Button} from '@mui/material';


const settings = ['Switch User', 'Switch League'];

function NavBar(props) {

    const [Open, setOpen] = useState(false)

    const handleOpenSettings = () => {
        setOpen(!Open)
    }

    function handleSettingsChange(val){
        if(val === 'Switch User'){
            props.setUserID('')
            props.setLeagueID('')
            props.setRosters([])
            props.setUsers([])
        } else if (val === 'Switch League'){
            props.setLeagueID('')
            props.setRosters([])
            props.setUsers([])
        } 
    }

    return (
    <AppBar position='static'>
        <Container>
            <Toolbar disableGutters>
                <Link to='/'>
                    <Typography> LOGO</Typography>
                </Link>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    {props.pages.map((page) => (
                        <Link
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            to={'/' + page.split(' ').join('').toLowerCase()}
                        >
                            {page}
                        </Link>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Account Settings">
                        <IconButton onClick={handleOpenSettings} sx={{ p: 0 }}>
                            <Avatar />
                        </IconButton>
                    </Tooltip>
                    <Menu 
                        open={Open}
                        sx={{ mt: '45px' }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        onClose={handleOpenSettings}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting}  onClick={() => handleSettingsChange(setting)}>
                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
    )
}

export default NavBar