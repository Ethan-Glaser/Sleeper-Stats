import React, {useState, useEffect} from 'react'
import { Box, List, ListItem, Typography} from '@mui/material'
import NFLTeam from './objects/NFLTeam'
import { lightenColor, nflTeamAbbreviations } from './Helper';

function NFLTeams() {
  
  const [TeamList, setTeamList] = useState([])
  
  useEffect(()=>{
    let t = []
    for(let abv in nflTeamAbbreviations){
      t.push(new NFLTeam(nflTeamAbbreviations[abv]))
    }
    setTeamList(t)
  },[nflTeamAbbreviations])
  
  let row
  
  if(TeamList && TeamList.length > 0){
    row = TeamList.map((team) => (
      <ListItem
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        backgroundImage: 'linear-gradient(135deg, #' + team.altcolor + ', #'+ team.color +', #'+ team.color +', #'+ team.altcolor + ')',
        borderRadius: 2,
        padding: '1.25rem',
        marginBottom: '1.5rem',
        boxShadow: 2,
        width: '100%', // Full width within its parent container
        '&:hover': {
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(135deg, '+ lightenColor('#' + team.altcolor, 20) + ', ' + lightenColor('#'+ team.color, 20) +', '+ lightenColor('#'+ team.color, 20) +', '+ lightenColor('#'+ team.altcolor, 20) + ')',
        },
      }}
      >
        <Typography
          variant="body1"
          sx={{
              flex: 1,
              textAlign: 'center',
              color: '#fefefe',
              fontWeight: 'bold',
          }}
        >
        {team.location} {team.name}
        </Typography>
      </ListItem>
    ))
  } else {
    row = <></>
  }


  return (
    <Box sx={{display:'flex', justifyContent:'center', width:'100%',  alignItems: 'center'}}>
      <List sx={{width:'100%', maxWidth: 1000}}>
        {row}
      </List>
    </Box>
  )
}

export default NFLTeams