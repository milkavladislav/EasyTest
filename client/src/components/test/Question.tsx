import { Grid, Typography } from "@mui/material/";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  button: {
    borderRadius: "5px",
    backgroundColor: "#a5d6a7",
    padding: "8px 16px",
    color: "#fff",
    textDecoration: "none",
  },
});

interface QuestionComponentProps {
  question: QuestionProps;
  nextPage: () => void;
  increaseEvolution: () => void;
}

export interface QuestionProps{
  text: string;
  answers: {
    text: string;
    isRight: boolean;
  }[];
}

export const Question = ({question, nextPage, increaseEvolution} : QuestionComponentProps) => {
  const classes = useStyles();
  const handleChange = (isRight: boolean) => () => {
    isRight && increaseEvolution();
    nextPage();
  };
  const {text, answers} = question;

  return (
    <>
     <Typography variant="h5" align='center'>{text}</Typography>
      <Grid container justifyContent="space-around">
        {answers.map(({ text, isRight }, i) => (<Grid>
          <button className={classes.button} onClick={handleChange(isRight)}>
            {text}
          </button>
        </Grid>)
        )}</Grid>

        
    </>
  );
};
