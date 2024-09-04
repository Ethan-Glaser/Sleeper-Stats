import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {AppBar, Container, Toolbar, Typography, Box, Menu, MenuItem, Tooltip, IconButton, Avatar, Button} from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';


const settings = ['Switch User', 'Switch League', 'Refresh'];

function NavBar(props) {

    const [Open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpenSettings = (event) => {
        if(!Open) setAnchorEl(event.currentTarget); else setAnchorEl(null)
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
    <AppBar  position="static" sx={{ backgroundColor: '#3f51b5', boxShadow: 3 }}>
        <Container maxWidth='xl'>
            <Toolbar disableGutters>
                <InsightsIcon />
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography 
                        variant="h6"
                        noWrap
                        sx={{
                            ml: 2,
                            fontWeight: 'bold',
                            color: '#fff',
                            letterSpacing: '.1rem',
                        }}
                    > 
                        Sleeper Analytics
                    </Typography>
                </Link>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    {props.pages.map((page) => (
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            to={'/' + page.split(' ').join('').toLowerCase()}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    my: 2,
                                    mx: 2,
                                    color: '#fff',
                                    '&:hover': {
                                        color: '#ffeb3b',
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                {page}
                            </Typography>
                        </Link>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Account Settings">
                        <IconButton onClick={handleOpenSettings} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: '#ffeb3b', color: '#3f51b5' }}/>
                        </IconButton>
                    </Tooltip>
                    <Menu 
                        open={Open}
                        anchorEl={anchorEl}
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
                            <MenuItem 
                                key={setting}  
                                onClick={() => handleSettingsChange(setting)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                }}
                            >
                            <Typography sx={{ textAlign: 'center', color: '#3f51b5' }}>{setting}</Typography>
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