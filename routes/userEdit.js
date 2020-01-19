var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Registration = mongoose.model('Registration');

const { body, validationResult } = require('express-validator/check');

// Ne marche pas ici pour une raison obscure
// router.get('/users/:userId', function(req, res) {
//   console.log(req);
//   Registration.findOne(
//     {_id: req.params._id}
//   ).then(user => {
//     res.render('userEdit',  { title: 'Editer utilisateur', user })
//   }
//   ).catch(error => {
//     res.render("Oopsie !")
//   });
// });

/* PUT user. */
// router.put('/users', [
//   body('name')
//     .isLength({ min: 1 })
//     .withMessage('Please enter a name'),
//   body('email')
//     .isLength({ min: 1 })
//     .withMessage('Please enter an email'),
// ], (req, res) => {
//   Registration.updateOne(
//     {_id: req.params._id},
//     {
//       $set: {
//         "name": body.name,
//         "email": body.email
//       }
//     }
//   ).then(user => {
//     res.render('index')
//   });
// });

module.exports = router;
