import React, {useState, useEffect} from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import JSONPlayers from './JSONPlayers.json';
import Player from './Player';

function Players() {
  const [PlayerList, setPlayerList] = useState([])

  useEffect(()=>{
    let players = []

    Object.keys(JSONPlayers).filter(itm => JSONPlayers[itm].active && ['QB', 'RB', 'WR', 'TE'].includes(JSONPlayers[itm].position)).forEach((id) => {
      players.push(new Player(id))
    });

    setPlayerList(players)
  },[])

  let rows = PlayerList.map((p) => (
    <TableRow>
      <TableCell>
        {p.name}
      </TableCell>
      <TableCell>
        {p.position}
      </TableCell>
    </TableRow>
  ))
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Players