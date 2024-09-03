import { Box, InputLabel , MenuItem, FormControl, Select } from '@mui/material'
import React, {useState, useEffect} from 'react'

function Team(props) {

  const [selectedRoster, setSelectedRoster] = useState(getLoginUser())
  
  const handleTeamSelect = (event) => {
    setSelectedRoster(event.target.value)
  }

  const rosterNames = props.Rosters.map((roster) =>(
    <MenuItem value={roster.roster_id}>{props.getTeamName(props.getUser(roster))}</MenuItem>
  ))

  function getLoginUser(){
    for(let r in props.Rosters){
      if(props.UserID === props.Rosters[r].owner_id){
        return props.Rosters[r].roster_id
      }
    }
    console.log('No user found: ' + props.UserID)
  }

  return(
    <Box>
      <FormControl>
        <InputLabel></InputLabel>
        <Select
          value={selectedRoster}
          onChange={handleTeamSelect}
          defaultValue={getLoginUser()}
        >
          {rosterNames}
        </Select>
      </FormControl>
      {selectedRoster}
    </Box>
  )

}

export default Team