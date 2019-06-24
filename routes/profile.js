const express = require('express')
const okta = require('@okta/okta-sdk-nodejs')


const client = new okta.Client({
  orgUrl: process.env.ORG_URL,
  token: process.env.REGISTRATION_TOKEN,
})

const router = express.Router()


const fields = [
  { label: 'First Name', name: 'firstName', required: true },
  { label: 'Last Name', name: 'lastName', required: true },
  { label: 'email', name: 'email' },
  // { label: 'City', name: 'city' },
  // { label: 'State', name: 'state' },
  // { label: 'Zip Code', name: 'zipCode' },
  // { label: 'Birthday', name: 'birthdate', type: 'date' },
  // { label: 'Favorite Color', name: 'favoriteColor' },
]

// router.post('/', async (req, res, next) => {
//   try {
    

//     Object.assign(req.user.profile, req.body)
//     await req.user.update()
//   } catch (error) {
//     console.log(error)
//   }

//   next()
// })


router.post('/', (req, res) => {
  
    console.log(req.body,"reyyy");
    client.getUser(req.body.profId)
    .then(user => {
      console.log(user);
      user.profile.name = req.body.name;
      user.profile.firstName = req.body.firstName;
      user.profile.lastName = req.body.lastName;
      user.profile.email = req.body.email;
      return user.update();
    })
    .then((updated)=>{
      console.log(updated,"yes hua");
      res.redirect('/profile');
    })
    .catch((err)=>{
      console.log(err,"ppppp");
    })
    // Object.assign(req.user.profile, req.body)
    // req.user.update()
  

})

router.get('/', (req, res, next) => {
  // console.log(req.user,"user")
  res.render('profile', {
    title: 'Profile',
    user: req.user,
    profId : req.user.id,
    fields: fields.map(field => ({
      ...field,
      value: req.user.profile[field.name],
    })),
  })
})

module.exports = router
