import React, {useEffect, useState} from 'react'
import { Box, List, ListItem, Typography } from '@mui/material'

function League(props) {

    const [Matchup, setMatchup] = useState([])
    const [WBracket, setWBracket] = useState([])
    const [LBracket, setLBracket] = useState([]) 
    
    useEffect(() => {
        fetchMatchups()
        fetchPlayoffBracket()
    },[])

    async function fetchMatchups(){
        try{
            const response = await fetch('https://api.sleeper.app/v1/league/' + props.LeagueID + '/matchups/' + props.NFLState.display_week)
            if (!response.ok){
                throw new Error('Matchup Fetch Error')
            }
            const data = await response.json()
            setMatchup(data)
        } catch (error){
            console.error('Error:', error)
        }
    }

    async function fetchPlayoffBracket(){
        try{
            const response1 = await fetch('https://api.sleeper.app/v1/league/' + props.LeagueID + '/winners_bracket')
            if (!response1.ok){
                throw new Error('Bracket Fetch Error')
            }
            const data1 = await response1.json()
            setWBracket(data1)
            const response2 = await fetch('https://api.sleeper.app/v1/league/' + props.LeagueID + '/losers_bracket')
            if (!response2.ok){
                throw new Error('Bracket Fetch Error')
            }
            const data2 = await response2.json()
            setLBracket(data2)
        } catch (error){
            console.error('Error:', error)
        }
    }

    async function fetchStandings(){
        try{
            const response = await fetch('GET https://api.sleeper.app/v1/league/' + props.LeagueID + '/rosters')
            if (!response.ok){
                throw new Error('Standings Fetch Error')
            }
            const data = await response.json()
            //setLeagues(data)
        } catch (error){
            console.error('Error:', error)
        }
    }

    let matchups
    if(Matchup && Matchup.length > 0){
        let pair = new Map()
        for(let match in Matchup){
            if(pair.has(Matchup[match].matchup_id)){
                pair.get(Matchup[match].matchup_id).push(Matchup[match])
            } else{
                pair.set(Matchup[match].matchup_id, [Matchup[match]])
            }
        }
        matchups = []
        pair.forEach((value, key) => {
            matchups.push(
                <ListItem>
                    <Typography>{props.getTeamName(props.getUser(props.getRoster(value[0].roster_id)))} vs {props.getTeamName(props.getUser(props.getRoster(value[1].roster_id)))}</Typography>
                </ListItem>
        )})
    } else{
        matchups = <></>
    }

    let rankings = props.Rosters.sort((r1, r2) =>{
        if(r1.settings.wins !==r2.settings.wins){
            return r2.settings.wins - r1.settings.wins
        }
        if(r1.settings.losses !== r2.settings.losses){
            return r1.settings.losses - r2.settings.losses
        }
        if(r1.settings.fpts + (r1.settings.fpts_decimal/100) !== r2.settings.fpts + (r2.settings.fpts_decimal/100)){
            return r2.settings.fpts + (r2.settings.fpts_decimal/100) - r1.settings.fpts - (r1.settings.fpts_decimal/100)
        }
        if(r1.settings.fpts_against + (r1.settings.fpts_against_decimal/100) !== r2.settings.fpts_against + (r2.settings.fpts_against_decimal/100)){
            return r1.settings.fpts_against + (r1.settings.fpts_against_decimal/100) - r2.settings.fpts_against - (r2.settings.fpts_against_decimal/100)
        }
        return 1
    })

    let ranklist

    if(rankings && rankings.length > 0){
        ranklist = rankings.map((roster) =>(
            <ListItem>
                <Typography>{props.getTeamName(props.getUser(props.getRoster(roster.roster_id)))}</Typography>
            </ListItem>
        ))
    }else{
        ranklist = <></>
    }



    return (
        <Box>
            <Box>
                <List>
                    {matchups}
                </List>
            </Box>
            <Box>
                <List>
                    {ranklist}
                </List>
            </Box>
            <Box>
                
            </Box>
        </Box>
    )
}

export default League