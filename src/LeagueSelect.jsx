import React, {useEffect, useState} from 'react'
import {Typography, ListSubheader , List,  ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import ContentBox from './style/ContentBox';
import { lightenColor } from './Helper';

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

    async function fetchLeague(id){
        try{
            const response = await fetch('https://api.sleeper.app/v1/league/'+ id)
            if (!response.ok){
                throw new Error('League Fetch Error')
            }
            const data = await response.json()
            for(let p in props.FullPlayerList){
                await props.FullPlayerList[p].calcScore(data.scoring_settings, 0)
            }
        } catch (error){
            console.error('Error:', error)
        }
    }

    async function leagueClick(id){
        props.setLeagueID(id)
        await fetchLeague(id)
        await fetchRosters(id)
        await fetchUsers(id)
        
    }


    let LeagueList

    if (Leagues && Leagues.length > 0 && props.FullPlayerList.length > 0){
        LeagueList = Leagues.map((league) => (
            <ListItemButton 
                onClick={() => leagueClick(league.league_id)}
                sx={{
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    borderRadius: '8px',
                    backgroundColor: 'alt.main',
                    boxShadow: 1,
                    '&:hover': {
                        backgroundColor: 'alt.light',
                    },
                    '&:focus': {
                        backgroundColor: 'alt.lightest',
                    },
                }}
            >
                <ListItemIcon
                    sx={{ 
                        color: 'text.secondary',
                        minWidth: '40px',
                    }}
                >
                    <SportsFootballIcon />
                </ListItemIcon>
                <ListItemText
                    primary={league.name}
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 'bold',
                    }}
                />
            </ListItemButton>
        ))
    } else {
        LeagueList = <>loading</>
    }

   

    return (
        <ContentBox
            sx={{
                width: '100%',
                maxWidth: '400px',
                margin: 'auto',
                p:3
            }}
        >
            <Typography
                variant="h5" 
                component="h1" 
                gutterBottom 
                sx={{ 
                    fontWeight: 'bold', 
                    color: 'text.primary',
                    textAlign: 'center'
                }}
            >
                Select League
            </Typography>
            <List
                sx={{ 
                    width: '100%',  
                }}
            >
                <ListSubheader
                    sx={{ 
                        backgroundColor: 'secondary.main', 
                        color: 'text.primary', 
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                >
                    Leagues
                </ListSubheader>
                {LeagueList}
            </List>
        </ContentBox>
    )
}

export default LeagueSelect