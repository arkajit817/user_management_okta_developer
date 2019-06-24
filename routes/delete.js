const express = require('express')
const okta = require('@okta/okta-sdk-nodejs')

const { startCase } = require('lodash')



const router = express.Router()

const client = new okta.Client({
    orgUrl: process.env.ORG_URL,
    token: process.env.REGISTRATION_TOKEN,
})


router.get('/', function (req, res, next) {

    let usersArray = [];
    const orgUsersCollection = client.listUsers();

    orgUsersCollection.each(user => {
        // console.log("srt", user.profile.firstName, "en");
        let userObj = {};
        userObj.id = user.id;
        userObj.profileDetails = user.profile;
        usersArray.push(userObj);


    })
        .then(() => {
            // console.log("start", usersArray, "end");
            res.render('delete', {
                title: 'Admin Page',
                usersArray,
                user: req.user,
            })
        })


})




router.post('/', (req, res) => {
    console.log(req.body, "aaya hai");
    client.getUser(req.body.id)
        .then(user => {
            console.log(user);
            return user.deactivate();

        })

        .then(() => {
        console.log('User has been deactivated')
        res.render('delete', {
            title: 'Delete',
            msg : 'User deleted from group'
          })
        }
        )
        .catch((err) => {
            console.log(err);
        })


})

module.exports = router

