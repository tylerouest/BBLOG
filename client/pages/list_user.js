import {Accounts} from 'meteor/accounts-base';
Template.userList.events({
    'click #cancelbtn'(event) {
        bootbox.hideAll();
    },
    'click #signupBtn'(event) {
        event.preventDefault();

    },
    'keyup input'(event){
        switch (event.which) {
            case 13:

                break;
            case 27:
                bootbox.hideAll();
        }
    },
});
Template.userList.rendered = function(){
    this.autorun(() => {
        Meteor.subscribe('countCom', Router.current().params._id);
        Meteor.subscribe('pubUserList');
    });

};
Template.userList.helpers({
    'users': function () {
        return Meteor.users.find()
    },
    'email': function () {
        return Meteor.users.find()
    }
});