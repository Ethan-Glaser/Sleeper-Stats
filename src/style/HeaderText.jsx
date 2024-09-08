import { Typography, styled } from "@mui/material"

const HeaderText = styled(Typography)(({theme})=>({
    marginBottom: '1rem',
    ...theme.typography.header
}))

export default HeaderText