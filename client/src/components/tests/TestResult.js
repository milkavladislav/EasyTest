import { useEffect } from "react";
import { connect } from "react-redux";
import { getTest } from "../../actions/testActions";
import { Wrapper } from "../wrapers/PageWrapper";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    borderRadius: "10px",
    width: "95%",
    backgroundColor: "#e8f5e9",
    padding: "10px 5%",
    marginTop: "15px",
  },
});

const TestsResult = (props) => {
  const classes = useStyles();
  const { test, loading } = props.test;
  const { passedTest } = test;

  const id = props.match.params.id;
  const { getTest } = props;

  console.log(passedTest)


  useEffect(() => {
    getTest(id);
  }, [getTest, id]);

  const parseDate = (dateString) => {
    let date = new Date(dateString);
    var dateFormat =
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);

    return dateFormat;
  };

  return (
    <Wrapper>
      {passedTest !== {} && passedTest !== undefined  && (
        <>
          <Typography variant="h3" align="center">
            Результати
          </Typography>
          {passedTest.map((result) => (
            <Grid classes={{ root: classes.root }} container>
              <Grid item xs={7}>
                <Typography variant="h5">{result.user}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">{parseDate(result.date)}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h5" align="right">
                  {result.evolution + " б."}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth,
  test: state.test
});

export default connect(mapStateToProps, { getTest })(TestsResult);
