Template.user_online.events({
    'mousewheel'(event) {

    },
    'click div'(event) {
        newConversation(this.username)
    },
    'mouseleave .pageArticle'(event) {

    }

});
Template.user_online.rendered = function () {

};
Template.user_online.helpers({
    'users': function () {

    },
    'destination': function () {
        let user = Meteor.users.findOne({_id: this._id});
        return {
            email: user.emails[0].address,
            username: user.username,
            img:this.to
        };
    },
    'profile': function () {

    },
    'statususers': function () {
        let uid = this._id;
        let status = Meteor.users.findOne({_id:uid}).status;
        if (status.idle) {
            return "busy"
        }else if (status.online) {
            return "connected"
        }else {
            return "logedOut";
        }
    },
});