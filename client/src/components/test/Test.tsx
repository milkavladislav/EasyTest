import { Box, Tab, Tabs, Typography } from "@mui/material/";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { Question, QuestionProps } from "./Question";
import { getTest } from "../../actions/testActions";
import { useEffect, useState } from "react";
import { Wrapper } from "../wrapers/PageWrapper";
import { makeStyles } from "@mui/styles";
import { markTest } from "../../actions/testActions";

const useStyles = makeStyles({
  paper: {
    borderRadius: "5px",
    backgroundColor: "#e8f5e9",
    padding: "2% 5%",
    margin: "0px 20%",
    textDecoration: "none",
  },
});

export interface TestProps {
  name: string;
  description: string;
  user: number;
  questions: QuestionProps[];
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Test = (props: any) => {
  const classes = useStyles();
  
  const { test, loading } = props.test;
  const { getTest, markTest } = props;
  const id = props.match.params.id;

  const [value, setValue] = useState(0);
  const [tabsShow, setTabsShow] = useState(true);
  const [evolution, setEvolution] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const increaseEvolution = () => {
    setEvolution(evolution + 1);
  }

  const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  useEffect(() => {
    getTest(id);
  }, [getTest, id]);

  const questions = test.questions;

  useEffect(() => {
    if(questions && value === questions.length) {
      setTabsShow(false)
      markTest({id: id, evolution: evolution, name: test.name})
    }
  }, [markTest, id, questions, value, test, evolution]);

  return test === null || loading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <div className={classes.paper}>
        <Typography variant="h4" align="center">
          {test.name}
        </Typography>
        {tabsShow && (
          <Tabs value={value} onChange={handleChange}>
            {questions &&
              [...Array(questions.length)].map((u, i) => (
                <Tab label={i + 1} {...a11yProps(i)} />
              ))}
          </Tabs>
        )}
        {questions &&
          questions.map((question: QuestionProps, index: number) => (
            <TabPanel value={value} index={index}>
              <Question
                question={question}
                nextPage={setValue.bind(null, index + 1)}
                increaseEvolution={increaseEvolution}
              />
            </TabPanel>
          ))}
        {questions && questions.length === value && (
          <TabPanel value={value} index={value}>
            <Typography>Ваш результат: {evolution}/{questions.length}</Typography>
          </TabPanel>
        )}
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state: any) => ({
  test: state.test,
  auth: state.auth,
});
export default connect(mapStateToProps, { getTest, markTest})(Test);
