import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
    root: {
      padding: '10px 50px',
    },
    
  });

  interface WrapperProps {
    children?: React.ReactNode;
  }

export const  Wrapper = ({children}: WrapperProps) => {
    const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>{children}</Paper>
  );
};
