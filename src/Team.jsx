import { Box, InputLabel , MenuItem, FormControl, Select, List, ListItem, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import Player from './Player'

function Team(props) {

  const [selectedRoster, setSelectedRoster] = useState(getLoginUser())
  const [selectedRosterID, setSelectedRosterID] = useState(getLoginUser().roster_id)
  const [Starters, setStarters] = useState([])
  const [Bench, setBench] = useState([])
  const [Taxi, setTaxi] = useState([])

  useEffect(()=>{
    changeDisplay(selectedRoster)
  },[selectedRoster])
  
  const handleTeamSelect = (event) => {
    let r = props.getRoster(event.target.value)
    setSelectedRoster(r)
    setSelectedRosterID(event.target.value)
    changeDisplay(r)

  }

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

  const rosterNames = props.Rosters.map((roster) =>(
    <MenuItem value={roster.roster_id}>{props.getTeamName(props.getUser(roster))}</MenuItem>
  ))

  function getLoginUser(){
    for(let r in props.Rosters){
      if(props.UserID === props.Rosters[r].owner_id){
        return props.Rosters[r]
      }
    }
    console.log('No user found: ' + props.UserID)
  }

  function changeDisplay(roster){
    let starterlist = []
    let benchlist = []
    let taxilist = []
    if(!roster.starters) roster.starters = []
    if(!roster.taxi) roster.taxi = []
    if(!roster.players) roster.players = []
    roster.starters.forEach((value, index, arr)=>{
      let p = new Player(value)
      starterlist.push(
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '1rem',
            marginBottom: '0.5rem',
            backgroundColor: '#fff',
            backgroundImage: 'linear-gradient(135deg, #' + p.team.color + ', #'+ p.team.altcolor + ')',
            borderRadius: '8px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
            width: '100%',
            maxWidth: '600px',
            '&:hover': {
              backgroundColor: '#fff',
              backgroundImage: 'linear-gradient(135deg, ' + lightenColor('#' + p.team.color, 20) + ', ' + lightenColor('#'+ p.team.altcolor, 20) + ')'
            },
          }}
        >
          <Typography
             variant="body1"
             sx={{
               fontWeight: 'bold',
               color: '#fefefe', // Main player name styling
             }}
          >
            {p.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#ccc', // Lighter color for the team and position
              fontSize: '0.875rem', // Smaller font size for team and position
            }}
          >
            {p.position} - {p.team.abbreviation}
          </Typography>
        </ListItem>
      )
    })
    setStarters(starterlist)
    roster.players.filter(itm=> !roster.starters.includes(itm)).filter(itm=> !roster.taxi.includes(itm)).forEach((value, index, arr)=>{
      let p = new Player(value)
      benchlist.push(
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '1rem',
            marginBottom: '0.5rem',
            backgroundColor: '#fff',
            backgroundImage: 'linear-gradient(135deg, #' + p.team.color + ', #'+ p.team.altcolor + ')',
            borderRadius: '8px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
            width: '100%',
            maxWidth: '600px',
            '&:hover': {
              backgroundColor: '#fff',
              backgroundImage: 'linear-gradient(135deg, ' + lightenColor('#' + p.team.color, 20) + ', ' + lightenColor('#'+ p.team.altcolor, 20) + ')'
            },
          }}
        >
          <Typography
             variant="body1"
             sx={{
               fontWeight: 'bold',
               color: '#fefefe', // Main player name styling
             }}
          >
            {p.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#ccc', // Lighter color for the team and position
              fontSize: '0.875rem', // Smaller font size for team and position
            }}
          >
            {p.position} - {p.team.abbreviation}
          </Typography>
        </ListItem>
      )
    })
    setBench(benchlist)
    roster.taxi.forEach((value, index, arr)=>{
      let p = new Player(value)
      taxilist.push(
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '1rem',
            marginBottom: '0.5rem',
            backgroundColor: '#fff',
            backgroundImage: 'linear-gradient(135deg, #' + p.team.color + ', #'+ p.team.altcolor + ')',
            borderRadius: '8px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
            width: '100%',
            maxWidth: '600px',
            '&:hover': {
              backgroundColor: '#fff',
              backgroundImage: 'linear-gradient(135deg, ' + lightenColor('#' + p.team.color, 20) + ', ' + lightenColor('#'+ p.team.altcolor, 20) + ')'
            },
          }}
        >
          <Typography
             variant="body1"
             sx={{
               fontWeight: 'bold',
               color: '#fefefe', // Main player name styling
             }}
          >
            {p.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#ccc', // Lighter color for the team and position
              fontSize: '0.875rem', // Smaller font size for team and position
            }}
          >
            {p.position} - {p.team.abbreviation}
          </Typography>
        </ListItem>
      )
    })
    setTaxi(taxilist)
  }

  return(
    <Box sx={{width:'100%',display: 'grid',flexDirection: 'row', columnGap: '50px'}}>
      <FormControl  sx={{ marginBottom: '1.5rem' , gridColumnStart: 1, gridColumnEnd:2}}>
        <InputLabel></InputLabel>
        <Select
          value={selectedRosterID}
          onChange={handleTeamSelect}
          variant="outlined"
        >
          {rosterNames}
        </Select>
      </FormControl>
      <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bold', gridColumnStart: 1, gridColumnEnd:2}}>Lineup</Typography>
      <Box sx={{ marginBottom: '2rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)' , gridColumnStart: 1, gridColumnEnd:2}}>
        <Typography variant="h6" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Starters</Typography>
        <List>
          {Starters}
        </List>
        </Box>
      <Box sx={{ marginBottom: '2rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)', gridColumnStart: 2, gridColumnEnd:3 }}>
        <Typography variant="h6" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Bench</Typography>
        <List>
          {Bench}
        </List>
      </Box>
      <Box sx={{ marginBottom: '2rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)', gridColumnStart: 3, gridColumnEnd:4 }}>
        <Typography variant="h6" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Taxi</Typography>
        <List >
          {Taxi}
        </List>
      </Box>
    </Box>
  )

}

export default Team