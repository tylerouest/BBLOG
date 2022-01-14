Template.conv.rendered = function(){

}
Template.conv.helpers({
    'notificationsConversation': function () {
        return Conversations.find({
            to:Meteor.user()._id
        });
    },
    'notificationsConversation2': function () {
        return Conversations.find({
            userId:Meteor.user()._id
        });
    }
});