import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
};

export default function CustomResponsiveFontSizes({children}) {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3" align="center" color={'#0070f3'}>{children}</Typography>
    </ThemeProvider>
  );
}