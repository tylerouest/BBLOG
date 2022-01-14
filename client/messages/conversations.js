import AutoLinker from 'meteor/konecty:autolinker'
msgInConv = 50;


Template.conversations.events({
    'click .head_msg'(event) {
        let target = event.target.parentNode.parentNode;
        if (target.classList.value == 'message_header') target = target.parentNode;
        if (target.classList.value != 'conversation'){
            /*
            event.preventDefault();
            Blaze.remove(Blaze.getView(Template.instance().$('.conversation')[0]))
            event.stopPropagation();
            UI.renderWithData(Template.conversations,function () {
                return Conversations.findOne({_id:this._id})
            },$('#emsg')[0]);
            */

            target.classList.value = 'conversation'
            setReads(this._id);
            $(target).find('input').focus();
        }else{
            target.classList.value = 'conversation closed'
        }
    },
    'click .close_conversation'(event) {
        event.preventDefault();
        Blaze.remove(Blaze.getView(Template.instance().$('.conversation')[0]))
        event.stopPropagation();
    },
    'keyup .new_msg_input'(event) {
        startTyping(this._id);
        switch (event.which) {
            case 13:
                let msg = event.target.value;
                if (msg == "") return;
                msg = Autolinker.link(msg);
                let chatid = event.target.parentNode.parentNode.dataset.id;
                let to = event.target.parentNode.parentNode.dataset.rec;
                if (this.userId != Meteor.user()._id) to = event.target.parentNode.parentNode.dataset.own
                Meteor.call('sendMessage', {
                    to:to,
                    msg: msg,
                    reaction:'',
                    chatid:chatid,
                    parentid: '',
                }, (err, res) => {
                    if (err) {
                        sAlert.error(err);
                    } else {
                        event.target.value = ''
                        stopTyping(this._id);
                    }
                });
                event.target.value = ''
                break;
            case 27:
                //échap
                break;
        }
    }
});
Template.conversations.rendered = function () {

};
Template.conversations.helpers({
    'nbNewMessages': function () {
        Meteor.subscribe("NewMsgByCid",this._id);
        let data = Messages.find({chatId:this._id,flag:'notread',userId:{$not:{$eq: Meteor.user()._id}}}).count();
        return data;
    },
    'status': function () {
        let uid = this.userId;
        if (this.userId == Meteor.user()._id) uid = this.to;
        let status = Meteor.users.findOne({_id:uid}).status;
        if (status.idle) {
            return "busy"
        }else if (status.online) {
            return "connected"
        }else {
            return "logedOut";
        }
    },
    'typing': function () {
        Template.instance().subscribe('typing',this._id);
        let nb = typing.find({
            chatId:this._id,
            userId:{$not:{$eq:Meteor.user()._id}}
        }).count();
        if (nb != 0) return 'typing';
    },
    'destination': function () {
        if (this.userId == Meteor.user()._id) {
            let user = Meteor.users.findOne({_id: this.to});
            return {
                email: user.emails[0].address,
                username: user.username,
                img:this.to
            };
        } else {
            let user = Meteor.users.findOne({_id: this.userId})
            return {
                email: user.emails[0].address,
                username: user.username,
                img:this.userId
            };
        }

    }
});
stopTyping = function(chatId){
    if (typeof TimerTyping != 'undefined'){
        Meteor.call('stopTyping',{chatId}, function(error, result) {
            if (error){
                sAlert.error(error);
            }else{

            }
        });
        Meteor.clearTimeout(TimerTyping);
    }
}
startTyping = function(chatId){
    let elem_cont = $('.conversation[data-id="'+chatId+'"] .message_container')
    if (typeof $(elem_cont)[0] != 'undefined') $(elem_cont).scrollTop($(elem_cont)[0].scrollHeight+100);
    if (typeof TimerTyping != 'undefined'){
        Meteor.call('stopTyping',{chatId}, function(error, result) {
            if (error){
                sAlert.error(error);
            }else{

            }
        });
        Meteor.clearTimeout(TimerTyping);
    }
    Meteor.call('startTyping',{chatId}, function(error, result) {
        if (error){
            sAlert.error(error);
        }else{

        }
    });
    TimerTyping = Meteor.setTimeout(function(){
        Meteor.call('stopTyping',{chatId}, function(error, result) {
            if (error){
                sAlert.error(error);
            }else{

            }
        });
    },2000);
}
reloadMessages = function(chatId){
    UI.renderWithData(Template.conversations,function () {
        return Conversations.findOne({_id:chatId})
    },$('#emsg')[0]);
}
newConversation = function(pseudo){
    let user = Meteor.users.findOne({username:pseudo});
    if (typeof user == 'undefined' || user._id == Meteor.user()._id){
        sAlert.error("Cet utilisateur n'existe pas !");
    }else{
        let id = user._id;
        let old_conversation_entrant = Conversations.findOne({to:id});
        let old_conversation_sortant = Conversations.findOne({userId:id});
        if (typeof old_conversation_entrant != 'undefined' || typeof old_conversation_sortant != 'undefined'){
            if (typeof old_conversation_entrant != 'undefined') chatId = old_conversation_entrant._id
            if (typeof old_conversation_sortant != 'undefined') chatId = old_conversation_sortant._id
            createConversation(chatId)
           // $('.conversation[data-id="'+chatId+'"]').removeClass('closed');
            //sAlert.info('Une conversation avec cette personne est déjà ouverte');
        }else{
            Meteor.call('createConversation',{to:id}, function(error, result) {
                if (error){
                    sAlert.error(error);
                }else{
                    createConversation(result)
                }
            });
        }
    }
};
setRead = function(chatId,id){
    Meteor.call('setAsReadMessage', {chatId:chatId, _id:id});
}
setReads = function(chatId){
    Meteor.call('setAsReadMessages', {chatId:chatId});
}
