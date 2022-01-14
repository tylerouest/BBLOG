callMethod = function(method,arg1,arg2){
    Meteor.call(method, arg1, arg2, function(error, result) {
        if (error){
            sAlert.error(error);
        }else{
            sAlert.success(result);
        }
    });
};
Template.compte.events({
    'mousewheel'(event) {

    },
    'mouseenter .reactionArticle'(event) {

    },
    'mouseleave .pageArticle'(event) {

    }

});
Template.compte.rendered = function () {

};
Template.compte.helpers({
    'user': function () {
        return Meteor.user();
    },
    'email': function () {
        return Meteor.user().emails[0].address;
    },
    'username': function () {
        return Meteor.user().username;
    },
    'profile': function () {
        return Meteor.user().profile;
    },
    'img': function () {
        return Meteor.user()._id;
    }
});