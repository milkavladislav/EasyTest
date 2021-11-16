import { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getTests } from "../../actions/testActions";
import { Wrapper } from "../wrapers/PageWrapper";
import TestItem from "./TestItem";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    borderRadius: "10px",
    backgroundColor: "#388e3c",
    padding: "1% 5%",
    color: "#fff",
    textDecoration: "none",
    fontSize: "30px",
    marginTop: "2%"
  },
});

const MyTests = (props: any) => {
  const classes = useStyles();
  const { tests, loading } = props.test;
  const user = props.user;
  const { getTests } = props;

  useEffect(() => {
    getTests();
  }, [getTests]);
  const id = user.user.id;

  return (
    <Wrapper>
      {tests !== null || loading ? (
        <Grid container justifyContent="space-around">
          {tests.map(
            (test: any) =>
              test.user === id && <TestItem key={test._id} test={test} />
          )}
        </Grid>
      ) : (
        <Spinner />
      )}
      <Grid container alignContent="center" justifyContent="center">
      <Link to={`/tests/create`} className={classes.button}>
        Створити тест
      </Link>
      </Grid>
    </Wrapper>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.auth,
  test: state.test,
});

export default connect(mapStateToProps, { getTests })(MyTests);
