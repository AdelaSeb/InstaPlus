<<<<<<< HEAD
const isEmpty = value => 
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);
=======
// old way: function isEmpty(value){}

//new way
const isEmpty = value =>
   value === undefined ||
   value === null ||
   (typeof value === 'object' && Object.keys(value).length === 0) ||
   (typeof value === 'string' && value.trim().length === 0);
>>>>>>> 4e4c06544e85138c399597e4f58a7f74f7d264bb

module.exports = isEmpty;