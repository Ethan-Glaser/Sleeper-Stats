import { ListItem, styled } from "@mui/material"

const BoxListItem = styled(ListItem)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '600px'
}))

export default BoxListItem