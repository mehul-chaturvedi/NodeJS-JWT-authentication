var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('./config')
var VerifyToken = require('./verifytoken');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('./usermodel');

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { return res.status(500).send('Error in server') }
        if (!user) { return res.status(404).send('User not found') }
        if (req.body.password !== user.password) { res.status(404).send({ auth: false, token: null }) }

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        })

        res.status(200).send({ auth: true, token: token });

    })
})

router.get('/logout', (req, res) => {
    res.sendDate(200).send({ auth: false, token: null })
})

router.post('/register', (req, res) => {
    console.log(req.body, 'req')
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, (err, user) => {
        if (err) {
            res.status(500).send('Prob')
        }

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        })
        console.log(token, 'token');
        res.status(200).send({ auth: true, token: token })
    })



})

router.get('/home', VerifyToken, function (req, res, next) {
    console.log(req.userId, 'uidman')
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });

});

module.exports = router;
