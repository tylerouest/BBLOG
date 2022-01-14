BaseController = RouteController.extend({
    layoutTemplate: 'mainLayout',
    findOptions: function() {
    },
    waitOn: function(){
        getLogin();
        Meteor.subscribe('pubUserList');
        Meteor.subscribe("conversations");
        Meteor.subscribe("conversations2");
        Meteor.subscribe("NewMsg");
        Meteor.subscribe("userStatus");
    },
    data: function(){

    }
});