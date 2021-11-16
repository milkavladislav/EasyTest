import { useState, useEffect } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

//redux
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

const Login = (props) => {
  console.log('props:', props);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    //console.log(props.auth.isAuthenticated);
    if (props.auth.isAuthenticated) {
      props.history.push('/tests');
    }
  });

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    props.loginUser(userData);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Увйдіть до свого облікового запису EasyTest
            </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={onChangeEmail}
                error={errors.email}
              />
              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={onChangePassword}
                error={errors.password}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

//export default Login;
export default connect(mapStateToProps, { loginUser })(Login);
