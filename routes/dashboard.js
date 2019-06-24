const express = require('express')
const okta = require('@okta/okta-sdk-nodejs')

const { startCase } = require('lodash')



const router = express.Router()

const client = new okta.Client({
  orgUrl: process.env.ORG_URL,
  token: process.env.REGISTRATION_TOKEN,
})


router.get('/', function (req, res, next) {
  const { profile } = req.user
  console.log(req.user,"pppp");
  const descriptionList = Object.keys(profile).sort()
    .map(key => ({
      term: startCase(key),
      details: profile[key],
    }))
    .filter(({ details }) => details)
    // console.log(descriptionList,"hhhhhhhh")
  res.render('dashboard', {
    title: 'Dashboard',
    descriptionList,
    user: req.user,
  })
})

router.post('/',(req,res)=>{
  console.log("inside admin");
  const newGroup = {
    profile: {
      name: 'Admin Fast Users'
    }
  };

  
  client.createGroup(newGroup)
  .then(group => {
    console.log('Created group', group);
    // process.env['ADMIN_GROUP_ID'] = group.id;
    // console.log(process.env['ADMIN_GROUP_ID'],"id");
    client.createApplicationGroupAssignment('0oar20ykq2H2wgeyi356', group.id);

    res.redirect('/admin',{
    })
  })
  .catch((err)=>{
    console.log(err,"error");
  });
})



module.exports = router
