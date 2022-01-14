Template.conversations_list.helpers({
    'conversations_list': function () {
        return Conversations.find({
            chatId: this._id
        });
    }
});