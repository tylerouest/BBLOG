Template.list_mess.events({
    'mousewheel'(event) {

    },
    'mouseenter .reactionArticle'(event) {

    },
    'mouseleave .pageArticle'(event) {

    }

});
Template.list_mess.rendered = function () {
    this.autorun(function() {
        Meteor.subscribe('messages', Router.current().params._id, 0, 200);
    });
};

Template.list_mess.helpers({
    'messages': function () {
        return Messages.find({chatId:Router.current().params._id});
    },
    'user': function () {

    },
    'email': function () {

    },
    'profile': function () {

    }
});