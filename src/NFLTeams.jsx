import React, {useState, useEffect} from 'react'
import { Box, List, ListItem, Typography} from '@mui/material'
import NFLTeam from './NFLTeam'

function NFLTeams() {

  const nflTeamAbbreviations = [
    "ARI", // Arizona Cardinals
    "ATL", // Atlanta Falcons
    "BAL", // Baltimore Ravens
    "BUF", // Buffalo Bills
    "CAR", // Carolina Panthers
    "CHI", // Chicago Bears
    "CIN", // Cincinnati Bengals
    "CLE", // Cleveland Browns
    "DAL", // Dallas Cowboys
    "DEN", // Denver Broncos
    "DET", // Detroit Lions
    "GB",  // Green Bay Packers
    "HOU", // Houston Texans
    "IND", // Indianapolis Colts
    "JAX", // Jacksonville Jaguars
    "KC",  // Kansas City Chiefs
    "LV",  // Las Vegas Raiders
    "LAC", // Los Angeles Chargers
    "LAR", // Los Angeles Rams
    "MIA", // Miami Dolphins
    "MIN", // Minnesota Vikings
    "NE",  // New England Patriots
    "NO",  // New Orleans Saints
    "NYG", // New York Giants
    "NYJ", // New York Jets
    "PHI", // Philadelphia Eagles
    "PIT", // Pittsburgh Steelers
    "SF",  // San Francisco 49ers
    "SEA", // Seattle Seahawks
    "TB",  // Tampa Bay Buccaneers
    "TEN", // Tennessee Titans
    "WSH"  // Washington Commanders
  ];
  
  const [TeamList, setTeamList] = useState([])
  
  useEffect(()=>{
    let t = []
    for(let abv in nflTeamAbbreviations){
      t.push(new NFLTeam(nflTeamAbbreviations[abv]))
    }
    setTeamList(t)
  },[nflTeamAbbreviations])
  
  function lightenColor(hex, percent) {
    // Convert hex to RGB
    const num = parseInt(hex.slice(1), 16),
          r = (num >> 16) + Math.round((255 - (num >> 16)) * percent / 100),
          g = ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100),
          b = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100);
  
    // Ensure RGB values are within 0-255
    const newR = (r > 255) ? 255 : r;
    const newG = (g > 255) ? 255 : g;
    const newB = (b > 255) ? 255 : b;
  
    // Convert back to hex and return
    return "#" + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1).toUpperCase();
  }

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