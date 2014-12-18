Template.header.events({
  'click .loggin': function(e) {
    var panel= document.getElementById("loggInPanel");
    if (panel.style.display != "block") {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
  },
  'click #login-buttons': function(e) {
      /*
      event.preventDefault()
       Meteor.loginWithFacebook({
            requestPermissions:  ['email', 'user_friends', 'user_location', 'user_events', 
            'friends_events', 'friends_location', 'friends_about_me',
            'user_status', 'friends_status', 'read_friendlists']
        }, function (err) {
            if(err) {
                console.log('loginWithFacebook error');
            } else {
                console.log('hello ik ben hier');
                Router.go('selfie');
            }
        });
        */
  }  
    
});


Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();

    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.name === name
    });

    return active && 'active';
  },
    userName:function() {
    return "name";
    }
});
