
Template.menu.events({
    'click .notif #dropDown'() {
        $('.drop-down.user').removeClass('drop-down--active');
        $('.drop-down.messages').removeClass('drop-down--active');
        $('.drop-down.notif').toggleClass('drop-down--active');
        createMnuNotifications();
    },
    'click .user #dropDown'() {
        $('.drop-down.notif').removeClass('drop-down--active');
        $('.drop-down.messages').removeClass('drop-down--active');
        $('.drop-down.user').toggleClass('drop-down--active');
    },
    'click .messages #dropDown'() {
        $('.drop-down.user').removeClass('drop-down--active');
        $('.drop-down.notif').removeClass('drop-down--active');
        $('.drop-down.messages').toggleClass('drop-down--active');
        createMnuMessages();
    },
    'click #login'() {
        bootbox.dialog({
            message: getTemplate(Template.login),
            size: 'medium',
            className: 'loginClass'
        });
        $('.drop-down').removeClass('drop-down--active');
    },
    'click #signup'() {
        bootbox.dialog({
            message: getTemplate(Template.signUp),
            size: 'large'
        });
        $('.drop-down').removeClass('drop-down--active');
    },
    'click #newMsg'() {
        bootbox.prompt("Avec qui voulez vous démarrez une conversation ?", function(result){
            if(result != null){
                newConversation(result);
            }else{

            }
        });
        $('.drop-down').removeClass('drop-down--active');
    },

    'click #compte'() {
        $('.drop-down').removeClass('drop-down--active');
        Router.go('/compte');
    },
    'click #newPost'() {
        $('.drop-down').removeClass('drop-down--active');
        Router.go('/nouveau');
    },
    'click #params'() {
        $('.drop-down').removeClass('drop-down--active');
        Router.go('/parametres');
    },
    'click #userList'() {
        $('.drop-down').removeClass('drop-down--active');
        Router.go('/membres/TEST');
    },
    'click #logout'() {
        Meteor.logout(function(err){
            if (err){
                sAlert.error(err);
            }else{
                DataLog.stop();
                sAlert.info('Vous êtes déconnecté !');
                $('#dropDown span.drop-down__name').text('Connection ');
                bootbox.hideAll();
            }

        });
        $('.drop-down').toggleClass('drop-down--active');
    }
});
Template.menu.helpers({
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
    'uid': function () {
        return Meteor.user()._id;
    },
    'nbnotifmsg': function () {
        return Counts.get('nbNewMsg');
    }
});
createMnuNotifications = function(){
    if ($('.notif .notificate').length <= 0) UI.render(Template.notif,$('.notif .scrollNotif')[0]);
}
createMnuMessages = function(){
    if ($('.messages .notificate').length <= 0) UI.render(Template.conv,$('.messages .scrollNotif')[0]);
}