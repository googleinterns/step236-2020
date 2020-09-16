import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      minWidth: 100,
    },
  },

  button: {
    background: '#457b9d',
    color: '#ffffff',
    '&:hover': {
      background: '#1d3557',
    },
  },

  buttonSecondary: {
    background: '#e63946',
    color: '#ffffff',
    '&:hover': {
      background: '#a31420',
    },
  },

  gridContainer: {
    padding: '2.5px 0 2.5px 0',
  },

  gridItem: {
    padding: '2.5px 5px 2.5px 5px',
  },

  paper: {
    width: '80%',
    minWidth: 300,
    margin: '10% 10% 0 10%',
    padding: '10px',
  },
}));
