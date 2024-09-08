import { Box, styled } from '@mui/material'

const ContentBox =styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.primary.main, // White background for the container
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)', // Elevation for visual separation
    borderRadius: '8px', // Rounded corners
    padding: '1rem', // Padding inside the box
    margin: '1rem', // Margin to separate from elements above
}))

export default ContentBox