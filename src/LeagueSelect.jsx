import React, {useEffect, useState} from 'react'
import {Box, Typography, ListSubheader , List,  ListItemButton, ListItemIcon, ListItemText} from '@mui/material'

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
            <ListItemButton onClick={() => leagueClick(league.league_id)}>
                <ListItemIcon>
    
                </ListItemIcon>
                <ListItemText>
                    {league.name}
                </ListItemText>
            </ListItemButton>
        ))
    } else {
        LeagueList = <></>
    }

   

    return (
        <Box>
            <Typography>Select League</Typography>
            <List>
                <ListSubheader>
                    Leagues
                </ListSubheader>
                {LeagueList}
            </List>
        </Box>
    )
}

export default LeagueSelect