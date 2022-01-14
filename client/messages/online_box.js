Template.online_box.events({
    'mousewheel'(event) {

    },
    'mouseenter .reactionArticle'(event) {

    },
    'mouseleave .pageArticle'(event) {

    }

});
Template.online_box.rendered = function () {

};
Template.online_box.helpers({
    'users': function () {
        return Meteor.users.find({_id:{$not:{$eq:Meteor.user()._id}}});
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