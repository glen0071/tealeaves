Router.configure({
  layoutTemplate: 'layout',
  controller: 'ExtendedController'
});

ExtendedController = RouteController.extend({
  onAfterAction: function () {
    var routeName = Router.current().route.getName();
  //  console.log("settting currentRoute to: "+routeName);
    Session.set('currentRoute', routeName);
  }
});

Router.route('/', {
  onBeforeAction: function () {
    if (!Meteor.userId()){
      this.render('viewQuestions');
    } else {
      this.render('following');
    }
  },
  name: 'following',
  template: 'following'
});

Router.route('about', {
  name: 'about',
  template: 'about'
});

Router.route('myProfile', {
  name: 'myProfile',
  template: 'myProfile',
  waitOn: function() {
    return Meteor.subscribe('userData');
 	},
  onBeforeAction: function(){
    if(!Meteor.userId()){
      this.render('/viewQuestions')
    } else {
      this.next();
    }
  }
});

Router.route('forgotPassword', {
  name: 'forgotPassword',
  template: 'forgotPassword'
});

Router.route('register', {
  name: 'register',
  template: 'register'
});

Router.route('social');

Router.route('addQuestion', {
  name: 'addQuestion',
  template: 'addQuestion',
  waitOn: function() {
    return Meteor.subscribe('pastThemes');
 	},
  onBeforeAction: function(){
    if(!Meteor.userId()){
      this.render('/login')
    } else {
      this.next();
    }
  }
});

Router.route('search',
{
  name: 'search',
  template: 'search'
});

Router.route('leaderboard',
{
  name: 'leaderboard',
  template: 'leaderboard'
});

Router.route('dashboard',  // maybe place onBeforeAction sending to home page if not admin
{
  name: 'dashboard',
  template: 'dashboard'
});

Router.route("/editUser/:_id", {
  name: 'editUser',
  waitOn: function() {
    return Meteor.subscribe('editUserData', this.params._id);
 	},
  data: function() {
    return Meteor.users.findOne(this.params._id);
  }
});

Router.route("/questions/:_id", {
  name: 'questionDetail',
  waitOn:function(){
    return [Meteor.subscribe('questionData', this.params._id),Meteor.subscribe('creatorData', this.params._id),Meteor.subscribe('answererData', this.params._id)];
  },
  data: function() {
    return Questions.findOne(this.params._id);
  }
});

Router.route("/user/:_id", {
  name: 'userProfile',
  waitOn: function() {
    return Meteor.subscribe('userData', this.params._id);
 	},
  data: function() {
    return Meteor.users.findOne(this.params._id);
  }
});

Router.route("/theme/:theme", {
  name: 'viewTheme',
  template:'viewQuestions'
});

Router.route('viewQuestions', {
  name: 'viewQuestions',
  template: 'viewQuestions',
  onAfterAction: function(){
    var filters = {closed: {$ne:true}};
  	Session.set('filters',filters);
    Pages.set({
      sort: {createdOn: -1} });
  }
});
