import React from 'react';
//import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
}) => {
  //console.log('render TextFieldGroup');

  // let inlineStyle = {
  //   display: 'block',
  // };
  let invalid = error ? ' is-invalid' : '';
  
  return (
    <div className="form-group">
      <input

        // className={classnames('form-control form-control-lg', {
        //   'is-invalid': error,
        // })}

        className={`form-control form-control-lg${invalid}`} 

        // {...(error ? { className: 'is-invalid' } : '')}

        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

export default TextFieldGroup;
