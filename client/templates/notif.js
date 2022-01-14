Template.notif.helpers({
    'notificationsArticle': function () {
        return centre_notifications.find({to:Meteor.user()._id});
    },
    'notificationsConversation': function () {
        return Conversations.find({
            to:Meteor.user()._id
        });
    },
    'notificationsConversation2': function () {
        return Conversations.find({
            userId:Meteor.user()._id
        });
    },
    'nbnotif': function () {
        return centre_notifications.find({to:Meteor.user()._id}).count();
    },
    'nbnotifmsg': function () {
        return Messages.find({flag:'notread',userId:{$not:{$eq: Meteor.user()._id}}},{}).count();
    }
});