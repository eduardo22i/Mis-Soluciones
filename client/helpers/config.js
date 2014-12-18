/*
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
*/

Accounts.ui.config({
    requestPermissions: {
        facebook: ['email', 'user_friends', 'user_location', 'user_events', 
            'friends_events', 'friends_location', 'friends_about_me',
            'user_status', 'friends_status', 'read_friendlists'],
    }
});


Meteor.autosubscribe(function(){
  var newUser = Meteor.user();
  Meteor.subscribe('currentAccessToken');
    Meteor.subscribe("aUser");
});

