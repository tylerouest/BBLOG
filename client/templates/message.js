Template.message.rendered = function(){
    $(' .scrollNotif').css('max-height',(window.innerHeight - 70)+'px');
    this.autorun(() => {
        //Meteor.subscribe('last_msg', this.data._id, this.data.to);
        //Meteor.subscribe('last_msg', this.data._id, this.data.userId);
    });
};
Template.message.events({
    'click .del_notif'() {
        //delNotification(Template.currentData()._id);
    },
    'click .notificate'() {
        let chatId = Template.currentData().chatId;
        if (typeof chatId == 'undefined') chatId = Template.currentData()._id;
        createConversation(chatId);
        setReads(chatId);
        let elem = $('.conversation[data-id="'+chatId+'"] span.notification')
        $(elem).html('0').attr('data-nb','0');
    },
    'click .notificate .img_user'() {
        Router.go('/profil/'+Template.currentData().userId);
    }
});
Template.message.helpers({
    'nbNewMessages': function () {
        Meteor.subscribe("NewMsgByCid",this._id);
        let data = Messages.find({chatId:this._id,flag:'notread',userId:{$not:{$eq: Meteor.user()._id}}}).count();
        return data;
    },
    'img': function () {
        let uid = Template.currentData().userId;
        if (Template.currentData().userId == Meteor.user()._id) uid = Template.currentData().to;
        return uid;
    },
    'last_msg': function () {
        let user = Template.currentData().userId;
        if (Template.currentData().userId == Meteor.user()._id) user = Template.currentData().to;
        let data_msg = Messages.findOne({chatId:Template.currentData()._id,userId:user},{sort:{createdAt: -1}});
        if (typeof data_msg != 'undefined') return data_msg.msg;
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
createConversation = function(chatId){
    if (typeof $('.conversation[data-id="'+chatId+'"]')[0] == 'undefined'){
        UI.renderWithData(Template.conversations,function () {
            return Conversations.findOne({_id:chatId})
        },$('#emsg')[0]);
    }
    $('.conversation[data-id="'+chatId+'"]').removeClass('closed');
    //Blaze.getView($('.conversation')[0]).templateInstance().data
}