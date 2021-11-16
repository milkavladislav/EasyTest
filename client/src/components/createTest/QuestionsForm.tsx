import {
    Box,
    Tab,
    Tabs,
    Typography,
    TextField,
    Grid,
    Button,
    Switch,
    RadioGroup,
    FormControlLabel,
    Radio,
  } from "@mui/material/";
  import { connect } from "react-redux";
  import { useEffect, useState } from "react";
  import { Wrapper } from "../wrapers/PageWrapper";
  import { makeStyles } from "@mui/styles";
  import { markTest } from "../../actions/testActions";
  import AddIcon from '@mui/icons-material/Add';
  
  const useStyles = makeStyles({
    name: {
      width: "100%",
      margin: "1% 0",
    },
    answer: {
      width: "100%",
      margin: "1% 0 1% 5%",
    },
    paper: {
      borderRadius: "5px",
      backgroundColor: "#e8f5e9",
      padding: "2% 5%",
      margin: "0px 20%",
      textDecoration: "none",
    },
  });
  
  export interface QuestionProps {
    text: string;
    answers: AnswerProps[];
  }
  
  export interface AnswerProps {
    text: string;
    isRight: boolean;
  }

  interface QuestionsFormProps{
      onChange: (event: any) => void;
  }
  
export const QuestionsForm = (props : QuestionsFormProps) => {
    const classes = useStyles();
    const [questions, setQuestions] = useState<Array<QuestionProps>>([]);
    const onChange = props.onChange;
    
    

    const [, forceUpdate] = useState(true);
  
    const addQuestion = () => {
      setQuestions([...questions, { text: "", answers: [] }]);
      onChange(questions);
    };
  
    const addAnswer = (index: number) => () => {
      questions[index].answers.push({ text: "", isRight: false });
      setQuestions(questions);
      forceUpdate((n) => !n);
      onChange(questions);
    }

    const changeQuestion = (index: number) =>  (event: any) => {
        questions[index].text = event.target.value;
        setQuestions(questions)
        forceUpdate((n) => !n);
        onChange(questions);
    }

    const changeAnswer = (questionIndex: number, answerIndex: number) =>  (event: any) => {
        questions[questionIndex].answers[answerIndex].text = event.target.value;
        setQuestions(questions)
        forceUpdate((n) => !n);
        onChange(questions);
    }

    const changeRightAnswer = (questionIndex: number, answerIndex: number) =>  (event: any) => {
        questions[questionIndex].answers.map((answer) => answer.isRight = false);
        questions[questionIndex].answers[answerIndex].isRight = true;
        setQuestions(questions)
        forceUpdate((n) => !n);
        onChange(questions);
    }
  
    return (<>
            {questions.length > 0 && (
              <>
                <Typography variant="h4">Запитання</Typography>
                {questions.map((question, questionIndex) => (
                  <Grid key={questionIndex} classes={{ root: classes.name }}>
                    <TextField
                      label="Запитання"
                      multiline
                      value={question.text}
                      onChange={changeQuestion(questionIndex)}
                      variant="outlined"
                      fullWidth
                    />
                    <Grid container>
                      {question.answers.map((answer, answerIndex) => (
                        <Grid key={answerIndex} classes={{ root: classes.answer }} container alignContent='center'>
                            <Grid item xs={11}>
                            <TextField
                            label="Відповідь"
                            value={answer.text}
                            onChange={changeAnswer(questionIndex, answerIndex)}
                            variant="outlined"
                            fullWidth
                          />
                            </Grid>
                          <Grid item xs={1}>
                          <Switch
                          checked={answer.isRight}
                          onChange={changeRightAnswer(questionIndex, answerIndex)}
                        />
                          </Grid>
                          
                        </Grid>
                      ))}
                      <Button fullWidth onClick={addAnswer(questionIndex)} startIcon={<AddIcon/>}>
                        Додати відповідь
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </>
            )}
            <Grid classes={{ root: classes.name }}>
              <Button fullWidth onClick={addQuestion}  startIcon={<AddIcon/>}>
                Додати питання
              </Button>
        </Grid>
        </>
    );
};


  