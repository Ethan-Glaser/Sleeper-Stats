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
        <ListItem>
          <Typography>{p.name} {p.position} {p.team}</Typography>
        </ListItem>
      )
    })
    setStarters(starterlist)
    roster.players.filter(itm=> !roster.starters.includes(itm)).filter(itm=> !roster.taxi.includes(itm)).forEach((value, index, arr)=>{
      let p = new Player(value)
      benchlist.push(
        <ListItem>
          <Typography>{p.name} {p.position} {p.team}</Typography>
        </ListItem>
      )
    })
    setBench(benchlist)
    roster.taxi.forEach((value, index, arr)=>{
      let p = new Player(value)
      taxilist.push(
        <ListItem>
          <Typography>{p.name} {p.position} {p.team}</Typography>
        </ListItem>
      )
    })
    setTaxi(taxilist)
  }

  return(
    <Box>
      <FormControl>
        <InputLabel></InputLabel>
        <Select
          value={selectedRosterID}
          onChange={handleTeamSelect}
        >
          {rosterNames}
        </Select>
      </FormControl>
      <Typography>Lineup</Typography>
      <List>
        {Starters}
      </List>
      <Typography>Bench</Typography>
      <List>
        {Bench}
      </List>
      <Typography>Taxi</Typography>
      <List>
        {Taxi}
      </List>

    </Box>
  )

}

export default Team