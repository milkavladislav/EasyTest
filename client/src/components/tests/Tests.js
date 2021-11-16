import { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getTests } from "../../actions/testActions";
import { Wrapper } from "../wrapers/PageWrapper";
import TestItem from "./TestItem";
import { Grid} from "@mui/material";

const Tests = (props) => {
  const { tests, loading } = props.test;
  const { getTests } = props;

  useEffect(() => {
    getTests();
  }, [getTests]);

  return (
    <Wrapper>
      {tests !== null || loading ? (<Grid container justifyContent='space-around'> 
        {tests.map((test) => <TestItem key={test._id} test={test} />)}
      </Grid>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  test: state.test,
});

export default connect(mapStateToProps, { getTests })(Tests);
