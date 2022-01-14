Template.emoji.events({
    'click .emo'(event){
        if($(event.target.parentNode.parentNode.parentNode.parentNode).hasClass('reactArticle')) {
            let uid = $('.pageArticle').attr('author');
            if (uid != Meteor.user()._id) saveNotification(uid,'reactionPage','/'+$('.pageArticle').attr('idarticle'),$('.pageArticle').attr('idarticle'),'',event.target.parentNode.attributes['data-id'].nodeValue);
            Meteor.call('setReactionPage', {
                id_article: $('.pageArticle').attr('idarticle'),
                pseudo: Meteor.user().emails[0].address,
                valeur: event.target.parentNode.attributes['data-id'].nodeValue
            });
            $('.reactArticle').html('');
        }else{
            let attributes = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].attributes;
            let hash = attributes['id'].nodeValue;
            let uid = attributes['uid'].nodeValue;
            if (uid != Meteor.user()._id) saveNotification(uid,'reactionComment','/'+$('.pageArticle').attr('idarticle')+'#'+hash,$('.pageArticle').attr('idarticle'),hash,event.target.parentNode.attributes['data-id'].nodeValue);
            Meteor.call('setReaction', {
                id_article:$('.pageArticle').attr('idarticle'),
                id_comment:hash,
                pseudo:Meteor.user().emails[0].address,
                valeur:event.target.parentNode.attributes['data-id'].nodeValue
            });
        }
        $('.reactions').html('');
    }
});
Template.emoji.rendered = function () {
    this.autorun(() => {
        Meteor.subscribe('reactions', $('.pageArticle').attr('idarticle'));
    });
};