UserController = BaseController.extend({
    template: 'userList',

    waitOn: function(){
        Meteor.subscribe('pubUserList');
    },
    data: function() {
        return Meteor.users.find({});
    }
});