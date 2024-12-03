import { createTheme } from "@mui/material";


export const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        border: 'none',
                        background: 'transparent',
                        '&:hover': {
                            border: 'none',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            outline: 'none', // Remove focus outline
                        },
                    },
                    '& .MuiInputBase-input': {
                        padding: '0',
                        height: '1.5rem',
                        fontSize: '0.875rem',
                        color: '#4B5563',
                    },
                },
            },
        },
        MuiPickersPopper: {
            styleOverrides: {
                root: {
                    zIndex: 9999,
                },
            },
        },
    },
});