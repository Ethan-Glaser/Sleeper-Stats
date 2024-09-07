import React, {useState, useEffect} from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,  TablePagination} from '@mui/material'

function Players(props) {
  const [PlayerList, setPlayerList] = useState([])
  const [page, setPage] = useState(0)
  const [numberRows, setNumberRows] = useState(10)

  useEffect(()=>{
    setPlayerList(props.FullPlayerList.slice(page * numberRows, (page + 1) * numberRows))
  },[page, numberRows, props.FullPlayerList])

  const handleChangePage = (event, p)=>{
    setPage(p)
    setPlayerList(props.FullPlayerList.slice(page * numberRows, (page + 1) * numberRows))

  }

  const handleChangeRowsPerPage = (event)=>{
    setNumberRows(parseInt(event.target.value))
    setPage(0)
    setPlayerList(props.FullPlayerList.slice(page * numberRows, (page + 1) * numberRows))
  }



  let rows
  try{ 
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
          <TableCell >
            <>points</>
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'passing').stats.find(obj => obj.name === 'passingYards').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'passing').stats.find(obj => obj.name === 'passingTouchdowns').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'passing').stats.find(obj => obj.name === 'completions').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'passing').stats.find(obj => obj.name === 'passingAttempts').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? Math.round(p.seasonStats.find(obj => obj.name === 'passing').stats.find(obj => obj.name === 'completionPct').value * 100) /100 : <>N/A</>}
          </TableCell>
          <TableCell>
            {<>Fav Targ</>}
          </TableCell>
          <TableCell>
            <>points</>
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'rushingYards').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'rushingTouchdowns').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'rushingAttempts').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? Math.round(p.seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'yardsPerRushAttempt').value * 100) / 100 : <>N/A</>}
          </TableCell>
          <TableCell>
            Share
          </TableCell>
          <TableCell>
            <>points</>
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingYards').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTouchdowns').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receptions').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTargets').value : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? Math.round(p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receptions').value/p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTargets').value *10000) / 100 : <>N/A</>}
          </TableCell>
          <TableCell>
            {p.seasonStats.length > 0 ? p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingYardsAfterCatch').value : <>N/A</>}
          </TableCell>
        </TableRow>
      ))
    } else{
      rows = <>loading</>
    }
  } catch (error){
    console.error('Render Error: ' + error)
  }
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={1}></TableCell>
              <TableCell colSpan={1}></TableCell>
              <TableCell colSpan={1}></TableCell>
              <TableCell colSpan={7}>Passing</TableCell>
              <TableCell colSpan={6}>Rushing</TableCell>
              <TableCell colSpan={8}>Recieving</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Yards</TableCell>
              <TableCell>TDs</TableCell>
              <TableCell>Completions</TableCell>
              <TableCell>Attempts</TableCell>
              <TableCell>Completion %</TableCell>
              <TableCell>Favorite Target</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Yards</TableCell>
              <TableCell>TDS</TableCell>
              <TableCell>Carrys</TableCell>
              <TableCell>YPC</TableCell>
              <TableCell>RB Share %</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Yards</TableCell>
              <TableCell>TDs</TableCell>
              <TableCell>Receptions</TableCell>
              <TableCell>Targets</TableCell>
              <TableCell>Catch %</TableCell>
              <TableCell>YAC</TableCell>
              <TableCell>WR Share %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                colSpan={24}
                count={props.FullPlayerList.length}
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