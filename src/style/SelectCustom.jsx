import { Select, styled } from "@mui/material"

const TMPSelect = styled(Select)(({theme}) => ({
    backgroundColor: theme.palette.primary.main, // Background color of the select
    color: theme.palette.text.primary,              // Text color of the select
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.text.primary,      // Border color when not focused
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.text.secondary,      // Border color on hover
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.alt.main,   // Border color when focused
    },
    '& .MuiSvgIcon-root': {
        color: theme.palette.text.primary,             // Arrow icon color
    },
}))

const SelectCustom =  (props) => {
    
    return (
        <TMPSelect
            {...props}
            variant="outlined"
            MenuProps={{
                PaperProps: {
                sx: {
                    backgroundColor:  '#233046', // Background color of the dropdown options
                    color: '#fff',              // Text color of the dropdown options
                },
                },
            }}
        >
            {props.children}
        </TMPSelect>
    )
}

export default SelectCustom