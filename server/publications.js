import { UserStatus } from 'meteor/mizzao:user-status';







Meteor.publish(null, function () {
    if (this.userId) {
        return Meteor.roleAssignment.find({ 'user._id': this.userId });
    } else {
        this.ready()
    }
})

Meteor.publish('singlePost', function(id){
    return Posts.find(id);
});

Meteor.publish("pubName", function (pageNumber, pageSize) {
    Counts.publish(this, 'countItems', Posts.find(),{
        noReady: true
    });
    return Posts.find({},{
        skip: pageNumber > 0 ? ((pageNumber) * pageSize) : 0,
        limit: pageSize,
        fields:{
            body:0
        }
    })
});
Meteor.publish("pubQuestions", function () {
    Counts.publish(this, 'countQuestions', Questions.find(),{
        noReady: true
    });
    return Questions.find()
});

Meteor.publish("searchPosts", function () {
    Counts.publish(this, 'countItemsSearch', Posts.find(),{
        noReady: true
    });
    return Posts.find({},{
        fields:{
            body:0
        }
    })
});

Meteor.publish("searchMembres", function (query) {
    const options = {
        fields: {
            username: 1,
            status: 1,
            emails: 1,
            roles: 1
        }
    };
    return Meteor.users.find({username:query}, options);
});

Meteor.publish("pubNotifications", function (id) {
    Counts.publish(this, 'countItemsNotif', centre_notifications.find({to:id}),{
        noReady: true
    });
    return centre_notifications.find({to:id},{
        fields:{
            body:0
        }
    })
});

Meteor.publish("pubUserProfil", function (id) {
        const selector = {
            _id: id
        };
        const options = {
            fields: {
                profile: 1,
                username: 1,
                emails: 1,
                roles: 1
            }
        };
        return Meteor.users.find(selector, options);
});

Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true }, { fields: { profile: 1} });
});

Meteor.publish(null, () => [
    Meteor.users.find({
        'status.online': true
    }, { // online users only
        fields: {
            status: 1,
            username: 1,
            roles: 1
        }
    }),
    UserStatus.connections.find()
]);

Meteor.publish("pubUserList", function (query) {
        const options = {
            fields: {
                username: 1,
                status: 1,
                emails: 1,
                roles: 1
            }
        };
        return Meteor.users.find({}, options);
});

Meteor.publish("NewMsg", function () {
    Counts.publish(this, 'nbNewMsg', Messages.find(
        {to:this.userId,flag:'notread',userId:{$not:{$eq: this.userId}}}
    ),{
        noReady: true
    });
});

Meteor.publish("NewMsgByCid", function (chatid) {
    let test =  Messages.find({chatId:chatid,flag:'notread',userId:{$not:{$eq: this.userId}}});
    return test;
});

Meteor.publish("TESTpub", function (chatid) {
    Counts.publish(this, 'TEST', Messages.find(
        {chatId:chatid,flag:'notread',userId:{$not:{$eq: this.userId}}}
    ),{
        noReady: true
    });
});

Meteor.publish("countCom", function (id) {
    Counts.publish(this, 'countCom', Comments.find(
        {parentArticle:id}
    ),{
        noReady: true
    });
});

Meteor.publish("typing", function (chatId) {
    return typing.find({
        chatId:chatId,
        userId:{$not:{$eq:this.userId}}
    },{

    });
});

Meteor.publish("commentaires", function () {
    Counts.publish(this, 'countItemsCom', Comments.find(),{
        noReady: true
    });
    return Comments.find({},{
    })
});

Meteor.publish("last_msg", function (chatid,uid) {
    return Messages.find({chatId:chatid,userId:uid},{limit:1,sort:{createdAt: -1}});
});

Meteor.publish("conversations", function () {
    Counts.publish(this, 'nbConversations', Conversations.find({userId:this.userId}),{
        noReady: true
    });
    return Conversations.find({userId:this.userId},{
    })
});

Meteor.publish("conversations2", function () {
    Counts.publish(this, 'nbConversations2', Conversations.find({to:this.userId}),{
        noReady: true
    });
    return Conversations.find({to:this.userId},{
    })
});

Meteor.publish("messages", function (chatId,pageNumber, pageSize) {
    Counts.publish(this, 'nbMessages', Messages.find(),{noReady: true});
    let skip = 0
    let nbMessages = Messages.find({chatId:chatId}).count();

    if (nbMessages > pageSize) skip = nbMessages-pageSize;

    return Messages.find({
        chatId: chatId
    }, {
        sort: {$natural: 1},
        skip: skip
    })

        return Messages.find({
            chatId: chatId,
            createdAt: {$gt: last_id}
        }, {
            sort: {$natural: 1}
        })
});
Meteor.publish("nbMessages", function (chatId) {
    Counts.publish(this, 'nbMessages', Messages.find(
        {
            chatId: chatId
        }
    ),{
        noReady: true
    });
});

Meteor.publish("reactions", function (id) {
    return React.find({id_article:id})
});
Meteor.publish("reactionsComment", function (id) {
    return React.find({id_comment:id})
});
Meteor.publish("reactionsPage", function (id) {
    Counts.publish(this, 'nbreactionsPage', React.find(
        {notread:'page', id_article:id}
    ),{
        noReady: true
    });
    return React.find({notread:'page', id_article:id})
});
