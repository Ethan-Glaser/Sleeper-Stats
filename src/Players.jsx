import React, {useState, useEffect} from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,  TablePagination} from '@mui/material'
import JSONPlayers from './JSONPlayers.json';
import Player from './Player';

function Players() {
  const [PlayerList, setPlayerList] = useState([])
  const [FullPlayerList, setFullPlayerList] = useState([])
  const [page, setPage] = useState(0)
  const [numberRows, setNumberRows] = useState(10)

  useEffect(()=>{
    let list = Object.keys(JSONPlayers).filter(itm => JSONPlayers[itm].active && ['QB', 'RB', 'WR', 'TE'].includes(JSONPlayers[itm].position) && JSONPlayers[itm].team)
    setFullPlayerList(list)
    updatelist(list)
  },[PlayerList, FullPlayerList, page, numberRows])

  const handleChangePage = (event, p)=>{
    setPage(p)
    updatelist(FullPlayerList)

  }

  const handleChangeRowsPerPage = (event)=>{
    setNumberRows(parseInt(event.target.value))
    setPage(0)
    updatelist(FullPlayerList)
  }

  function updatelist(list){
    let players = []
    for(let i = page * numberRows; i < (page + 1) * numberRows ; i++){
      players.push(new Player(list[i]))
    }
    setPlayerList(players)
  }

  let rows 
  if(PlayerList && PlayerList.length> 0){
    rows = PlayerList.map((p) => (
      <TableRow>
        <TableCell>
          {p.name}
        </TableCell>
        <TableCell>
          {p.position}
        </TableCell>
        <TableCell>
          {p.team ?  p.team.location+ ' ' + p.team.name : <>N/A</>}
        </TableCell>
      </TableRow>
    ))
  } else{
    rows = <></>
  }
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Team</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                colSpan={3}
                count={FullPlayerList.length}
                rowsPerPage={numberRows}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Players