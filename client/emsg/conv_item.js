Template.conv_item.events({
    'click .notificate'(event) {
        Router.go('/emsg/'+event.target.dataset.id)
        if (typeof SubMessages != 'undefined') SubMessages.stop();
        SubMessages = Template.instance().subscribe('messages', event.target.dataset.id, 0, 200);
    },
    'mouseenter .reactionArticle'(event) {

    },
    'mouseleave .pageArticle'(event) {

    }

});
Template.conv_item.rendered = function () {
    this.autorun(() => {
        Meteor.subscribe('countCom', Router.current().params._id);
        Meteor.subscribe('last_msg', this.data._id, this.data.to);
        Meteor.subscribe('last_msg', this.data._id, this.data.userId);
    });
};
Template.conv_item.helpers({
    'img': function () {
        let uid = Template.currentData().userId;
        if (Template.currentData().userId == Meteor.user()._id) uid = Template.currentData().to;
        return uid;
    },
    'last_msg': function () {
        let user = Template.currentData().userId;
        if (Template.currentData().userId == Meteor.user()._id) user = Template.currentData().to;
        return Messages.findOne({chatId:Template.currentData()._id,userId:user},{sort:{createdAt: -1}}).msg;
    },
    'infos': function () {
        let uid = Template.currentData().userId;
        if (Template.currentData().userId == Meteor.user()._id) uid = Template.currentData().to;

        let user = Meteor.users.findOne({_id: uid});
        return {
            email: user.emails[0].address,
            username: user.username,
            img:uid
        };

    }
});