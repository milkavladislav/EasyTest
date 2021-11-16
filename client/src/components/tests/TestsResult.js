import { useEffect } from "react";
import { connect } from "react-redux";
import { getResults } from "../../actions/testActions";
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

const TestsResults = (props) => {
  const classes = useStyles();
  const { passedTests } = props.user;
  const { getResults } = props;


  useEffect(() => {
    getResults();
  }, [getResults]);

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
      {passedTests !== {}  && (
        <>
          <Typography variant="h3" align="center">
            Результати
          </Typography>
          {passedTests.map((test) => (
            <Grid classes={{ root: classes.root }} container>
              <Grid item xs={7}>
                <Typography variant="h5">{test.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">{parseDate(test.date)}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h5" align="right">
                  {test.evolution + " б."}
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
});

export default connect(mapStateToProps, { getResults })(TestsResults);
