const mongodb = require('mongodb');

const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');

const router = express.Router();
const Registration = mongoose.model('Registration');

router.post('/',
  [
    body('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    body('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
        .then(() => { res.send('Thank you for your registration!'); })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

router.get('/', (req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.delete('/registrations/:userId', (req, res) => {
  console.log(req.params.userId);
  Registration.deleteOne({_id: new mongodb.ObjectID(req.params.userId)}).then(() => {
      res.send("Utilisateur supprimé")
  })
    .catch(() => res.send("Erreur"))
});

router.get('/users/:userId', function(req, res) {
   console.log(req.params.userId);
  const id = new mongodb.ObjectID(req.params.userId);
  console.log(id);
  Registration.findOne(
    {_id: id}
  ).then((user) => {
    console.log(user);
    res.render('userEdit',  { title: 'Editer utilisateur', user: user })
  }
  ).catch(() => { res.send("Oopsie !") });
});

router.post('/users', [
  body('name')
    .isLength({ min: 1 })
    .withMessage('Please enter a name'),
  body('email')
    .isLength({ min: 1 })
    .withMessage('Please enter an email'),
], (req, res) => {
  console.log(req.params);
  console.log(req.body);
  Registration.updateOne(
    {_id: req.body._id},
    {
      $set: {
        "name": req.body.name,
        "email": req.body.email
      }
    }
  ).then(() => {
    res.render('index', {title: "Utilisateur édité !"})
  });
});

module.exports = router;
