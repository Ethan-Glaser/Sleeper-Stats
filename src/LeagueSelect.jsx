import React, {useEffect, useState} from 'react'
import {Box, Typography, ListSubheader , List,  ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import SportsFootballIcon from '@mui/icons-material/SportsFootball';

function LeagueSelect(props) {

    useEffect(() =>{
        fetchLeagues()
    },[])

    const [Leagues, setLeagues] = useState([])

    async function fetchLeagues(){
        try{
            const response = await fetch('https://api.sleeper.app/v1/user/' + props.UserID + '/leagues/nfl/' + props.NFLState.league_season)
            if (!response.ok){
                throw new Error('League Fetch Error')
            }
            const data = await response.json()
            setLeagues(data)
        } catch (error){
            console.error('Error:', error)
        }
    }

    async function fetchUsers(id){
        try{
            const response = await fetch('https://api.sleeper.app/v1/league/'+ id +'/users')
            if (!response.ok){
                throw new Error('League Fetch Error')
            }
            const data = await response.json()
            props.setUsers(data)
        } catch (error){
            console.error('Error:', error)
        }
    }

    async function fetchRosters(id){
        try{
            const response = await fetch('https://api.sleeper.app/v1/league/'+ id +'/rosters')
            if (!response.ok){
                throw new Error('League Fetch Error')
            }
            const data = await response.json()
            props.setRosters(data)
        } catch (error){
            console.error('Error:', error)
        }
    }

    async function leagueClick(id){
        props.setLeagueID(id)
        await fetchRosters(id)
        await fetchUsers(id)
    }


    let LeagueList

    if (Leagues && Leagues.length > 0){
        LeagueList = Leagues.map((league) => (
            <ListItemButton 
                onClick={() => leagueClick(league.league_id)}
                sx={{
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: 1,
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                    '&:focus': {
                        backgroundColor: '#e0e0e0',
                    },
                }}
            >
                <ListItemIcon
                    sx={{ 
                        color: '#3f51b5',
                        minWidth: '40px',
                    }}
                >
                    <SportsFootballIcon />
                </ListItemIcon>
                <ListItemText
                    primary={league.name}
                    sx={{
                        color: '#3f51b5',
                        fontWeight: 'bold',
                    }}
                />
            </ListItemButton>
        ))
    } else {
        LeagueList = <></>
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
                Select League
            </Typography>
            <List
                sx={{ 
                    width: '100%', 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: 1, 
                    boxShadow: 1 
                }}
            >
                <ListSubheader
                    sx={{ 
                        backgroundColor: '#3f51b5', 
                        color: '#fff', 
                        fontWeight: 'bold' 
                    }}
                >
                    Leagues
                </ListSubheader>
                {LeagueList}
            </List>
        </Box>
    )
}

export default LeagueSelect