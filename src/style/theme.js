import { createTheme } from "@mui/material";

function lightenColor(hex, percent) {
    // Convert hex to RGB
    const num = parseInt(hex.slice(1), 16),
          r = (num >> 16) + Math.round((255 - (num >> 16)) * percent / 100),
          g = ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100),
          b = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100);
  
    // Ensure RGB values are within 0-255
    const newR = (r > 255) ? 255 : r;
    const newG = (g > 255) ? 255 : g;
    const newB = (b > 255) ? 255 : b;
  
    // Convert back to hex and return
    return "#" + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1).toUpperCase();
  }

const theme = createTheme({
    palette: {
        primary: {
            main: '#233046',
        },
        secondary:{
            main: '#182233',
        },
        background:{
            default:'#17263A'
        },
        text:{
            primary:'#fff',
            secondary:'#ccc'
        },
        alt:{
            main: '#3f51b5',
            light: lightenColor('#3f51b5', 10),
            lightest: lightenColor('#3f51b5', 20)
        }
    },
    typography:{
        navigation:{
            ...createTheme().typography.body1,
            '&:hover': {
                color: '#3f51b5',       
            },
            color: '#fff'
        },
        header:{
            ...createTheme().typography.h6,
            fontWeight: 'bold',
            color: '#fff'
        },
        playername:{
            ...createTheme().typography.body1,
            fontWeight: 'bold',
            color: '#fff'
        },
        playerinfo:{
            ...createTheme().typography.body2,
            color: '#ccc',
            fontSize: '0.875rem',
        }
    }
})

export default theme;