Meteor.methods({
    'sendMessage'({to,msg,reaction,chatid,parentid}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');

        return Messages.insert({
            to:to,
            msg:msg,
            reaction:reaction,
            chatId:chatid,
            flag:'notread',
            userId:this.userId,
            createdAt:new Date()
        });
    },
    'deleteMessage'({id}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        return Messages.remove(id);
    },
    'createConversation'({to}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');

        return Conversations.insert({
            to:to,
            userId:this.userId,
            createdAt:new Date()
        });
    },
    'deleteConversation'({id}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        return Conversations.remove(id);
    },
    'setAsReadMessage'({chatId,_id}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');

        return Messages.update({to:this.userId,chatId:chatId,_id:_id,flag:'notread'},{
            $set:{flag:new Date()}
        });
    },
    'startTyping'({chatId}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');

        return typing.insert({
            chatId:chatId,
            userId:this.userId
        });
    },
    'stopTyping'({chatId}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');

        return typing.remove({
            chatId:chatId,
            userId:this.userId
        });
    },
    'setAsReadMessages'({chatId}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');

        return Messages.update({to:this.userId,chatId:chatId,flag:'notread'},{
            $set:{flag:new Date()}
        },{multi:true});
    },
});