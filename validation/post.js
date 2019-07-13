const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.photo = !isEmpty(data.photo) ? data.photo : '';
  data.caption = !isEmpty(data.caption) ? data.caption : '';
  
  if (Validator.isEmpty(data.photo)) {
    errors.photo = 'Picture is required';
  }

  if (!Validator.isLength(data.caption, { min: 5, max: 300 })) {
    errors.caption = 'Caption must be between 5 and 300 characters';
  }

  /** 
  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }
  */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};