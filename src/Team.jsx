import { Box, InputLabel , MenuItem, FormControl, Select, List, ListItem, Typography, styled } from '@mui/material'
import React, {useState, useEffect} from 'react'
import Player from './objects/Player'
import HeaderText from './style/HeaderText'
import ContentBox from './style/ContentBox'
import BoxListItem from './style/BoxListItem'
import SelectCustom from './style/SelectCustom'
import { lightenColor, getLoginUser, getTeamName, getUser, getRoster } from './Helper'

function Team(props) {

  const [selectedRoster, setSelectedRoster] = useState(getLoginUser(props.Rosters, props.UserID))
  const [Starters, setStarters] = useState([])
  const [Bench, setBench] = useState([])
  const [Taxi, setTaxi] = useState([])

  useEffect(()=>{
    changeDisplay(selectedRoster)
  },[selectedRoster])
  
  const handleTeamSelect = (event) => {
    let r = getRoster(event.target.value, props.Rosters)
    setSelectedRoster(r)
    changeDisplay(r)

  }

  const rosterNames = props.Rosters.map((roster) =>(
    <MenuItem value={roster.roster_id}>{getTeamName(getUser(roster, props.Users))}</MenuItem>
  ))


  function generateDisplay(list, setter){
    let tmplist = []
    list.forEach((value, index, arr)=>{
      let p = new Player(value)
      if(p.team === null){
        console.log(p.name)
      }
      tmplist.push(
        <BoxListItem
          sx={{
            backgroundColor: 'background.default',
            backgroundImage: 'linear-gradient(135deg, #' + p.team.color + ', #'+ p.team.altcolor + ')',
            '&:hover': {
              backgroundColor: 'background.default',
              backgroundImage: 'linear-gradient(135deg, ' + lightenColor('#' + p.team.color, 20) + ', ' + lightenColor('#'+ p.team.altcolor, 20) + ')'
            },
          }}
        >
          <Typography variant="playername">{p.name}</Typography>
          <Typography variant="playerinfo">{p.position} - {p.team.abbreviation}</Typography>
        </BoxListItem>
      )
    })
    setter(tmplist)
  }

  function changeDisplay(roster){
    if(!roster.starters) roster.starters = []
    if(!roster.taxi) roster.taxi = []
    if(!roster.players) roster.players = []
    generateDisplay(roster.starters, setStarters)
    generateDisplay(roster.players.filter(itm=> !roster.starters.includes(itm)).filter(itm=> !roster.taxi.includes(itm)), setBench)
    generateDisplay(roster.taxi, setTaxi)
  }

  return(
    <Box sx={{width:'100%',display: 'grid',flexDirection: 'row', columnGap: '10px'}}>
      <FormControl  sx={{ marginBottom: '1.5rem' , px:2.5 ,gridColumnStart: 1, gridColumnEnd:2}}>
        <InputLabel></InputLabel>
        <SelectCustom
          value={selectedRoster.roster_id}
          onChange={handleTeamSelect}
        >
          {rosterNames}
        </SelectCustom>
      </FormControl>
      <ContentBox sx={{gridColumnStart: 1, gridColumnEnd:2}}>
        <HeaderText>Starters</HeaderText>
        <List>
          {Starters}
        </List>
      </ContentBox>
      <ContentBox sx={{gridColumnStart: 2, gridColumnEnd:3 }}>
        <HeaderText>Bench</HeaderText>
        <List>
          {Bench}
        </List>
      </ContentBox>
      <ContentBox sx={{gridColumnStart: 3, gridColumnEnd:4 }}>
        <HeaderText>Taxi</HeaderText>
        <List >
          {Taxi}
        </List>
      </ContentBox>
    </Box>
  )

}

export default Team