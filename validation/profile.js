
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.website = !isEmpty(data.website) ? data.website : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  
   if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
   }

   if (Validator.isEmpty(data.handle)) {
     errors.handle = 'Profile handle is required';
   }

  // if (Validator.isEmpty(data.numOfPosts)) {
  //   errors.status = 'numOfPosts field is required';
  // }

  // if (Validator.isEmpty(data.followers)) {
  //   errors.skills = 'Followers field is required';
  // }

  // if (Validator.isEmpty(data.following)) {
  //   errors.skills = 'Following field is required';
  // }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};