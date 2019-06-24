const express = require('express')
const okta = require('@okta/okta-sdk-nodejs')

const { startCase } = require('lodash')



const router = express.Router()

const client = new okta.Client({
  orgUrl: process.env.ORG_URL,
  token: process.env.REGISTRATION_TOKEN,
})


router.get('/', function (req, res, next) {
  //   const { profile } = req.user
  //   // console.log(req.user,"pppp");
  //   const descriptionList = Object.keys(profile).sort()
  //     .map(key => ({
  //       term: startCase(key),
  //       details: profile[key],
  //     }))
  //     .filter(({ details }) => details)

  //   res.render('dashboard', {
  //     title: 'Dashboard',
  //     descriptionList,
  //     user: req.user,
  //   })
  let usersArray = [];
  const orgUsersCollection = client.listUsers();
  // let grp = client.getGroup('00gr8xq826g2YitI9356');
  // grp.then((gp)=>{
  //   console.log(gp,"fghj");
  // })
  // console.log("start",orgUsersCollection,"end");
  // orgUsersCollection
  //   .then((orgs)=>{
  //     console.log("start",orgs,"end")
  //   })
  orgUsersCollection.each(user => {
    // console.log("srt", user.profile.firstName, "en");
    let userObj = {};
    userObj.id = user.id;
    userObj.profileDetails = user.profile;
    usersArray.push(userObj);

    // const descriptionList = Object.keys(user).sort()
    //   .map(key => ({
    //     term: startCase(key),
    //     details: user[key],
    //   }))

    //   .filter(({ details }) => details)
    // usersArray.push(descriptionList);
  })
    .then(() => {
      // console.log("start", usersArray, "end");
      res.render('admin', {
        title: 'Admin Page',
        usersArray,
        user: req.user,
      })
    })
  // .then((orgs)=>{
  //   console.log
  // })
  // const descriptionList = Object.keys(profile).sort()
  //     .map(key => ({
  //       term: startCase(key),
  //       details: profile[key],
  //     }))
  //     .filter(({ details }) => details)
  // .then((users) => console.log('All users have been listed'));
  // const { profile } = req.user;
  // console.log("start",usersArray,"end");
  // res.render('admin', {
  //     title: 'Admin Page',
  //     usersArray,
  //     user: req.user,
  //   })

})




router.post('/', (req, res) => {
  console.log("inside make");
  console.log(req.body.id, "dfghjmk,")
  // console.log(process.env['ADMIN_GROUP_ID'],"inside id");
  let grp = client.getGroup('00gr8xq826g2YitI9356');
  // let appl = client.getApplication('0oar20ykq2H2wgeyi356');
  let groupId = {};
  grp.then((gp)=>{
    console.log(gp,"fghj");
    //  return client.getUser(req.body.id);
    return client.addUserToGroup(gp.id,req.body.id);
  })

  // appl.then((gp)=>{
  //   console.log(gp,'gggggggg')
    // console.log(gp._links.groups.href,"fghj");
    // let aaa = gp._links.groups.href.split('/');
    // let grpId = aaa[aaa.length-2];
    // console.log(grpId,"aaya hai");
    //  return client.addUserToGroup(grpId,req.body.id);
  // })
  .then((resps)=>{
    console.log(resps,'hua hai');
    res.render('admin', {
      title: 'Admin Page',
      msg : 'User added in Admin group'
    })
    // res.redirect(200,'/admin',{
    //   // title: 'Admin Page',
    //     msg : 'User added in Admin group'
    })
  .catch((err)=>{
    console.log(err);
  })
  // client.getUser(req.body.id)
  //   .then(user => {
  //     console.log(user);
  //   });
  // const newGroup = {
  //   profile: {
  //     name: 'Admin Users Group1'
  //   }
  // };

  // client.createGroup(newGroup)
  // .then(group => {
  //   console.log('Created group', group);
  // })
  // .catch((err)=>{
  //   console.log(err,"error");
  // });
})

function abc(){
  console.log('<<<<<<<<<<<<<<<<<<<<<<')
}


module.exports = router
