import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {CustomMenu} from './Menu'
import {AccountMenu} from './AccountMenu'
import { logoutUser } from '../../actions/authActions';
import { Grid} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  background: {
    backgroundColor: '#c8e6c9',
    height: '70px',
    padding: '0 20px'
  },
  item: {
    color: '#1b5e20'
  }
})


const Navbar = (props: any) => {
  const { isAuthenticated, user } = props.auth;
  console.log(user)

  const classes = useStyles();

  const onLogoutClick = () => {
    props.logoutUser();
  };

  const authLinks = (
    <Grid container direction="row" alignItems="center">
      <Grid item> 
        <AccountMenu {...{user, onLogoutClick}}/>
      </Grid>
      <Grid item>
        <CustomMenu />
      </Grid>
    </Grid>
  );

  const guestLinks = (
    <Grid container spacing={2}>
      <Grid item>
        <Link to="/register" className={classes.item}>
          Sign Up
        </Link>
      </Grid>
      <Grid item>
        <Link to="/login" className={classes.item}>
          Login
        </Link>
      </Grid>
    </Grid>
  );

  return (
      <Grid className={classes.background} container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
        <Link to="/tests" className={classes.item}>
          EasyTest
        </Link>
        </Grid>
        <Grid item>
          {isAuthenticated ? authLinks : guestLinks}
        </Grid>
      </Grid>
  );
 
};

//export default Navbar;
const mapStateToProps = (state: any) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
