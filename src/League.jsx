import React, {useEffect, useState} from 'react'
import { Box, List, ListItem, Typography } from '@mui/material'
import ContentBox from './style/ContentBox'
import HeaderText from './style/HeaderText'
import { getTeamName, getUser, getRoster } from './Helper'

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
                <ListItem
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#e0e0e0', // Light shade to make it pop
                        borderRadius: 2,
                        padding: '1.25rem',
                        marginBottom: '1.5rem',
                        boxShadow: 2,
                        width: '100%', // Full width within its parent container
                        '&:hover': {
                            backgroundColor: '#bdbdbd', // Slightly darker on hover
                        },
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            flex: 1,
                            textAlign: 'left',
                            color: '#333',
                            fontWeight: 'bold',
                            pl:'8px'
                        }}
                    >
                        {getTeamName(getUser(getRoster(value[0].roster_id, props.Rosters), props.Users))}</Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mx: 2, // Margin on the sides of "vs"
                            color: '#555',
                            fontWeight: 'bold',
                        }}
                    >
                        vs
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            flex: 1,
                            textAlign: 'right',
                            color: '#333',
                            fontWeight: 'bold',
                            pr:'8px'
                        }}
                    >
                        {getTeamName(getUser(getRoster(value[1].roster_id, props.Rosters),props.Users))}
                    </Typography>
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
            <ListItem
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#e0e0e0', // Light background for each item
                    border: '1px solid #ddd', // Border to separate items
                    borderRadius: 2, // Rounded corners for each item
                    padding: '.3rem', // Padding inside the item
                    marginBottom: '0.5rem', // Space between items
                    boxShadow: 1, // Subtle shadow for visual separation
                    width: '100%', // Full width within its parent container
                    '&:hover': {
                        backgroundColor: '#bdbdbd', // Slightly darker on hover
                    },
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        color: '#333', // Dark color for readability
                        fontWeight: 'bold', // Emphasize the text
                        textAlign:'center'
                    }}
                >
                    {getTeamName(getUser(getRoster(roster.roster_id, props.Rosters), props.Users))}
                </Typography>
            </ListItem>
        ))
    }else{
        ranklist = <></>
    }



    return (
        <Box sx={{width:'100%',display: 'flex',flexDirection: 'row',}}>
            <ContentBox sx={{width: '100%', maxWidth: 800, overflow: 'auto'}}>
                <HeaderText>Matchups</HeaderText>
                <List sx={{width:'100%'}}>
                    {matchups}
                </List>
            </ContentBox>
            <ContentBox sx={{width: '100%', maxWidth: 800, overflow: 'auto'}}>
                <HeaderText>Rankings</HeaderText>
                <List>
                    {ranklist}
                </List>
            </ContentBox>
        </Box>
    )
}

export default League