import React, {useState, useEffect} from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,  TablePagination, TableSortLabel, Typography, TextField} from '@mui/material'
import { getTeamShare, getTeamSplit, nflTeamAbbreviations } from './Helper'
import ContentBox from './style/ContentBox'

function Players(props) {
  const [PlayerList, setPlayerList] = useState([])
  const [DisplayPlayerList, setDisplayPlayerList] = useState([])
  const [page, setPage] = useState(1)
  const [numberRows, setNumberRows] = useState(10)
  const [TeamShares, setTeamShares] = useState({})
  const [TeamSplits, setTeamSplits] = useState({})
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [filter, setFilter] = useState({'name':'', 'position': '', 'team':''})

  useEffect(()=>{
    let l = applyFilterAndSort(props.FullPlayerList)
    setPlayerList(l)
    setDisplayPlayerList(l.slice(0 * 10, (0 + 1) * numberRows))
    let sl = []
    let sh = []
    if(TeamShares.length <=0){
    for(let abv in nflTeamAbbreviations){
      sl[nflTeamAbbreviations[abv]] = getTeamSplit(nflTeamAbbreviations[abv], props.FullPlayerList)
      sh[nflTeamAbbreviations[abv]] = getTeamShare(nflTeamAbbreviations[abv], props.FullPlayerList)

    }
    }
    setTeamShares(sh)
    setTeamSplits(sl)
  },[props.FullPlayerList, sortConfig, filter])

  const handleChangePage = (event, p)=>{
    setPage(p)
    setDisplayPlayerList(PlayerList.slice(page * numberRows, (page + 1) * numberRows))

  }

  const handleChangeRowsPerPage = (event)=>{
    setNumberRows(parseInt(event.target.value))
    setPage(0)
    setDisplayPlayerList(PlayerList.slice(page * numberRows, (page + 1) * numberRows))
  }

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const applySort = (data) => {
    if (!sortConfig.key) return data;
    const sortedData = [...data].sort((a, b) => {
      let aVal, bVal
      let [cat, stat] = sortConfig.key.split('.')
      if(cat === 'pas'){
        aVal = getNestedStat(a, 'passing', stat)
        bVal = getNestedStat(b, 'passing', stat)
      } else if(cat === 'rush'){
        aVal = getNestedStat(a, 'rushing', stat)
        bVal = getNestedStat(b, 'rushing', stat)
      } else if(cat === 'rec'){
        aVal = getNestedStat(a, 'receiving', stat)
        bVal = getNestedStat(b, 'receiving', stat)
      } else{
        aVal = a[stat]
        bVal = b[stat]
      }
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortedData;
  };

  const getNestedStat = (player, statCategory, statName) => {
    try {
      if('rushshare' === statName){
        return (TeamSplits[player.team.abbreviation].find(obj => obj.name === player.name).seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'rushingAttempts').value) / (TeamSplits[player.team.abbreviation].reduce((sum, x) => sum + x.seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'rushingAttempts').value ,0))
      } else if('recshare' === statName){
        return (TeamSplits[player.team.abbreviation].find(obj => obj.name === player.name).seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTargets').value) / (TeamSplits[player.team.abbreviation].reduce((sum, x) => sum + x.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTargets').value ,0))
      } else if('catchper'  === statName){
        return player.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receptions').value/player.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTargets').value
      }
      const category = player.seasonStats.find(obj => obj.name === statCategory);
      const stat = category?.stats.find(obj => obj.name === statName);
      return stat ? stat.value : 0;
    } catch (error) {
      return 0;
    }
  };

  const handleFilterChange = (event) =>{
    setFilter({...filter, [event.target.name]: event.target.value})
  }

  const applyFilter = (data) => {
    return data.filter(player => 
      player.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      (player.team.location + ' ' + player.team.name).toLowerCase().includes(filter.team.toLowerCase()) &&
      player.position.toLowerCase().includes(filter.position.toLowerCase())
    );
  };

  const applyFilterAndSort = (data) => {
    return applySort(applyFilter(data));
  };


  let rows
   
  if(DisplayPlayerList && DisplayPlayerList.length> 0){
    rows = DisplayPlayerList.map((p) => {
      try{
        return(
        <TableRow>
          <TableCell>
            {p.name}
          </TableCell>
          <TableCell>
            {p.position}
          </TableCell>
          <TableCell>
            {p.team.location+ ' ' + p.team.name}
          </TableCell>
          <TableCell >
            <>points</>
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'passing').stats.find(obj => obj.name === 'passingYards').value}
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'passing').stats.find(obj => obj.name === 'passingTouchdowns').value}
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'passing').stats.find(obj => obj.name === 'completions').value}
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'passing').stats.find(obj => obj.name === 'passingAttempts').value}
          </TableCell>
          <TableCell>
            {Math.round(p.seasonStats.find(obj => obj.name === 'passing').stats.find(obj => obj.name === 'completionPct').value * 100) /100}
          </TableCell>
          <TableCell>
            {p.position === 'QB' ? TeamShares[p.team.abbreviation][0].name : <>N/A</>}
          </TableCell>
          <TableCell>
            <>points</>
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'rushingYards').value}
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'rushingTouchdowns').value}
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'rushingAttempts').value}
          </TableCell>
          <TableCell>
            {Math.round(p.seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'yardsPerRushAttempt').value * 100) / 100}
          </TableCell>
          <TableCell>
            {Math.round((TeamSplits[p.team.abbreviation].find(obj => obj.name === p.name).seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'rushingAttempts').value) / (TeamSplits[p.team.abbreviation].reduce((sum, x) => sum + x.seasonStats.find(obj => obj.name === 'rushing').stats.find(obj => obj.name === 'rushingAttempts').value ,0)) * 10000)/100}
          </TableCell>
          <TableCell>
            <>points</>
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingYards').value}
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTouchdowns').value}
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receptions').value}
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTargets').value}
          </TableCell>
          <TableCell>
            {Math.round(p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receptions').value/p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTargets').value *10000) / 100}
          </TableCell>
          <TableCell>
            {p.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingYardsAfterCatch').value}
          </TableCell>
          <TableCell>
            {Math.round((TeamSplits[p.team.abbreviation].find(obj => obj.name === p.name).seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTargets').value) / (TeamSplits[p.team.abbreviation].reduce((sum, x) => sum + x.seasonStats.find(obj => obj.name === 'receiving').stats.find(obj => obj.name === 'receivingTargets').value ,0)) * 10000)/100}
          </TableCell>
        </TableRow>
        )
      } catch (error){
        return(
          <TableRow>
          <TableCell>
            {p.name}
          </TableCell>
          <TableCell>
            {p.position}
          </TableCell>
          <TableCell>
            {p.team.location+ ' ' + p.team.name}
          </TableCell>
          <TableCell >
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            <>N/A</>
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
          <TableCell>
            0
          </TableCell>
        </TableRow>
        )
      }
  })
  } else{
    rows = <>loading</>
  }
 
  return (
    <Box>
      <ContentBox display='flex'  flexDirection='row' sx={{mt:0, mb:4}}>
          <Box sx={{mr:5}}>
            <Typography sx={{mb:1}} color='text.primary'>Filter By Name</Typography>
            <TextField
              variant="outlined"
              name='name'
              value={filter.name}
              onChange={handleFilterChange}
            />
          </Box>
          <Box sx={{mr:5}}>
            <Typography sx={{mb:1}} color='text.primary'>Filter By Position</Typography>
            <TextField
              variant="outlined"
              name='position'
              value={filter.position}
              onChange={handleFilterChange}
            />
          </Box>
          <Box sx={{mr:5}}>
            <Typography sx={{mb:1}} color='text.primary'>Filter By Team</Typography>
            <TextField
              variant="outlined"
              name='team'
              value={filter.team}
              onChange={handleFilterChange}
            />
          </Box>
      </ContentBox>
      <TableContainer sx={{backgroundColor:'primary.main',  maxHeight: 800}} component={Paper}>
        <Table>
          <TableHead sx={{backgroundColor:'secondary.main'}}>
            <TableRow>
              <TableCell colSpan={1}></TableCell>
              <TableCell colSpan={1}></TableCell>
              <TableCell colSpan={1}></TableCell>
              <TableCell colSpan={7}>Passing</TableCell>
              <TableCell colSpan={6}>Rushing</TableCell>
              <TableCell colSpan={8}>Recieving</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
              <TableSortLabel
                  active={sortConfig.key === 'gen.name'}
                  direction={sortConfig.key === 'gen.name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('gen.name')}
                >
                Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Position
              </TableCell>
              <TableCell>
                Team
              </TableCell>
              <TableCell>
                Points
              </TableCell>
              <TableCell>
                <TableSortLabel
                    active={sortConfig.key === 'pas.passingYards'}
                    direction={sortConfig.key === 'pas.passingYards' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('pas.passingYards')}
                  >
                  Yards
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                      active={sortConfig.key === 'pas.passingTouchdowns'}
                      direction={sortConfig.key === 'pas.passingTouchdowns' ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort('pas.passingTouchdowns')}
                    >
                    TDs
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                      active={sortConfig.key === 'pas.completions'}
                      direction={sortConfig.key === 'pas.completions' ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort('pas.completions')}
                    >
                    Completions
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                      active={sortConfig.key === 'pas.passingAttempts'}
                      direction={sortConfig.key === 'pas.passingAttempts' ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort('pas.passingAttempts')}
                    >
                    Attempts
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                      active={sortConfig.key === 'pas.completionPct'}
                      direction={sortConfig.key === 'pas.completionPct' ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort('pas.completionPct')}
                    >
                    Completion %
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Favorite Target
              </TableCell>
              <TableCell>
                Points
              </TableCell>
              <TableCell>
                <TableSortLabel
                      active={sortConfig.key === 'rush.rushingYards'}
                      direction={sortConfig.key === 'rush.rushingYards' ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort('rush.rushingYards')}
                    >
                    Yards
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                      active={sortConfig.key === 'rush.rushingTouchdowns'}
                      direction={sortConfig.key === 'rush.rushingTouchdowns' ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort('rush.rushingTouchdowns')}
                    >
                    TDs
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                        active={sortConfig.key === 'rush.rushingAttempts'}
                        direction={sortConfig.key === 'rush.rushingAttempts' ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort('rush.rushingAttempts')}
                      >
                      Carrys
                  </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                        active={sortConfig.key === 'rush.yardsPerRushAttempt'}
                        direction={sortConfig.key === 'rush.yardsPerRushAttempt' ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort('rush.yardsPerRushAttempt')}
                      >
                      YPC
                  </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                        active={sortConfig.key === 'rush.rushshare'}
                        direction={sortConfig.key === 'rush.rushshare' ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort('rush.rushshare')}
                      >
                      Rushing Share %
                  </TableSortLabel>
              </TableCell>
              <TableCell>
                Points
              </TableCell>
              <TableCell>
                <TableSortLabel
                        active={sortConfig.key === 'rec.receivingYards'}
                        direction={sortConfig.key === 'rec.receivingYards' ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort('rec.receivingYards')}
                      >
                      Yards
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                        active={sortConfig.key === 'rec.receivingTouchdowns'}
                        direction={sortConfig.key === 'rec.receivingTouchdowns' ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort('rec.receivingTouchdowns')}
                      >
                      TDs
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                        active={sortConfig.key === 'rec.receptions'}
                        direction={sortConfig.key === 'rec.receptions' ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort('rec.receptions')}
                      >
                      Receptions
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                        active={sortConfig.key === 'rec.receivingTargets'}
                        direction={sortConfig.key === 'rec.receivingTargets' ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort('rec.receivingTargets')}
                      >
                      Targets
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                        active={sortConfig.key === 'rec.catchper'}
                        direction={sortConfig.key === 'rec.catchper' ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort('rec.catchper')}
                      >
                      Catch %
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                        active={sortConfig.key === 'rec.receivingYardsAfterCatch'}
                        direction={sortConfig.key === 'rec.receivingYardsAfterCatch' ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort('rec.receivingYardsAfterCatch')}
                      >
                      YAC
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                        active={sortConfig.key === 'rec.recshare'}
                        direction={sortConfig.key === 'rec.recshare' ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort('rec.recshare')}
                      >
                      Recieving Share %
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
          <TableFooter sx={{backgroundColor:'secondary.main'}}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                colSpan={24}
                count={PlayerList.length}
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