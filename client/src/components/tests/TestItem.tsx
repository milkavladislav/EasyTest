import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import BarChartIcon from '@mui/icons-material/BarChart';
import { deleteTest } from "../../actions/testActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    borderRadius: "10px",
    width: "45%",
    backgroundColor: "#e8f5e9",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    borderRadius: "5px",
    backgroundColor: "#4caf50",
    padding: "8px 16px",
    color: "#fff",
    textDecoration: "none",
  },
  action: {
    height: '40px'
  }
});

const TestItem = ({ test, auth, showActions, deleteTest }: any) => {
  const classes = useStyles();
  let history = useHistory();

  const onDeleteClick = (id: number) => {
    deleteTest(id);
  };

  const onResultClick = (id: string) => {
    history.push("/tests/results/" + id);
  };

  return (
    <Grid classes={{ root: classes.root }} justifyContent='space-between'>
      <Typography variant="h4">{test.name}</Typography>
      <Typography variant="h6">{test.description}</Typography>
        <Grid container justifyContent="space-between" alignItems="center" className={classes.action}>
          <Grid item>
            <Link to={`/tests/${test._id}`} className={classes.button}>
              Пройти тест
            </Link>
          </Grid>
         {test.user === auth.user.id && (
          <Grid item>
            <IconButton onClick={onResultClick.bind(null, test._id)}>
              <BarChartIcon />
            </IconButton>
            <IconButton onClick={onDeleteClick.bind(null, test._id)}>
              <DeleteIcon />
            </IconButton>
          </Grid>)}
        </Grid>
    </Grid>
  );
};

TestItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteTest })(TestItem);
