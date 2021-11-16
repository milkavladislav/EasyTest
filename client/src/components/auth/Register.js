import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard');
    }
  });

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      // password2: this.state.password2
    };

    //console.log('newUser:', newUser);
    props.registerUser(newUser, props.history);
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Створіть акаунт EasyTest безкоштовно</p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                type="text"
                value={name}
                onChange={onChangeName}
                error={errors.name}
              />
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={onChangeEmail}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
              />
              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={onChangePassword}
                error={errors.password}
              />
              {/* <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={password2}
                onChange={onChange}
                error={errors.password2}
              /> */}
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

//export default Register;
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
