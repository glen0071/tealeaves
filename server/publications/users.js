Meteor.publish("allUsersData", function(){
  return Meteor.users.find();
});

Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'username':1,'emails': 1,'points':1}});
});

Meteor.publish("editUserData", function () {
  return Meteor.users.find();
});

Meteor.publish("userData", function (user) {
    return Meteor.users.find({_id: (user?user : this.userId)}, //get passed in user, otherwise currently logged in one
        {fields:{
          "services.facebook.email": 1,
          "services.google.email": 1,
          "services.twitter.screenName": 1,
          "emails.address[0]": 1,
          "profile": 1,
          "username":1,
          "points":1
      }
      });
});

Meteor.publish("creatorData", function (currentQuestion) {
  var questionDoc = Questions.findOne(currentQuestion);
    return Meteor.users.find({_id: questionDoc.createdBy},
        {fields: {'username':1,'emails':1}});
});

Meteor.publish("answererData", function (currentQuestion) {
  // console.log("publishing answererData");
  var questionDoc = Questions.findOne(currentQuestion);
  var answersArray = questionDoc.answers;
  // console.log(answersArray.length +"people answered");

  var answerersArray=[];
  answersArray.forEach(function (item, index, array) {
//    console.log(item.userId+' answered.');
    answerersArray.push(item.userId);
  });
    return Meteor.users.find({_id: {$in:answerersArray}},
        {fields: {'points':1}});
});
