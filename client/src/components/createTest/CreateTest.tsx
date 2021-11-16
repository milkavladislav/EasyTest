import {
  Typography,
  TextField,
  Grid,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle
} from "@mui/material/";
import { connect } from "react-redux";
import { useState } from "react";
import { Wrapper } from "../wrapers/PageWrapper";
import { makeStyles } from "@mui/styles";
import { addTest } from "../../actions/testActions";
import { QuestionsForm, QuestionProps } from "./QuestionsForm";
import { useHistory } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';

const useStyles = makeStyles({
  name: {
    width: "100%",
    margin: "1% 0",
  },
  submit: {
    width: "80%",
    margin: "1% 10% 1% 10%",
  },
  paper: {
    borderRadius: "5px",
    backgroundColor: "#e8f5e9",
    padding: "2% 5%",
    margin: "0px 20%",
    textDecoration: "none",
  },
});


const CreateTest = ({ test, addTest }: any) => {
  let history = useHistory();
  const classes = useStyles();
  const initialState = () => {
    return {
      name: "",
      description: "",
      questions: [{}],
    };
  };
  const [values, setValues] = useState(initialState());

  const [, forceUpdate] = useState(true);

  const handleChange = (name: string) => (event: any) => {
    values &&
      event &&
      event.target &&
      event.target.value &&
      setValues({ ...values, [name]: event.target.value });
  };

  const handleQuestionsChange = (questions: QuestionProps[]) => {
    setValues({ ...values, questions: questions });
  };

  const handleSubmit = () => {
    addTest(values);
    forceUpdate((n) => !n);
  };

  const handleClose = () => {
    test.test.success = false;
    forceUpdate((n) => !n);
    history.push("/tests/my");
  };

  return (
    <Wrapper>
      <div className={classes.paper}>
        {test && test.test && test.test.success ? ( 
          <Dialog
          open={true}
        >
          <DialogTitle>
            Ваш тест успішно додано!
          </DialogTitle>
          <DialogContent>
            <Typography variant="h5">Ви будете перенаправлені до Ваших тестів через 5 секунд</Typography>
          </DialogContent>
        </Dialog>
        ) : (
          <>
            <Typography variant="h3">Створення тесту</Typography>
            <Grid container direction="column">
              {values && (
                <>
                  <Grid classes={{ root: classes.name }}>
                    <TextField
                      value={values.name}
                      onChange={handleChange("name")}
                      label="Назва"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid classes={{ root: classes.name }}>
                    <TextField
                      value={values.description}
                      onChange={handleChange("description")}
                      label="Опис"
                      multiline
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <QuestionsForm onChange={handleQuestionsChange} />
                  <Grid classes={{ root: classes.submit }}>
                    <Button fullWidth onClick={handleSubmit} startIcon={<SaveIcon/>}>
                      Зберегти
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </>
        )}
      </div>
      <Snackbar
        open={test.test.success === true}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Ваш тест успішно додано!
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

const mapStateToProps = (state: any) => ({
  test: state.test,
});
export default connect(mapStateToProps, { addTest })(CreateTest);
