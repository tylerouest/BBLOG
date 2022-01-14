import { Template } from 'meteor/templating';
Template.postItem.helpers({
    'reactionsPage': function () {
        return React.find({id_article: this._id,notread:'page'});
    },
    'nbComment': function () {
        return Comments.find({parentArticle: this._id}).count();
    },
    'listReaction1': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'1'});
    },
    'listReaction2': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'2'});
    },
    'listReaction3': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'3'});
    },
    'listReaction4': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'4'});
    },
    'listReaction5': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'5'});
    },
    'listReaction6': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'6'});
    },

    'listReactions1': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'1'}).count();
    },
    'listReactions2': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'2'}).count();
    },
    'listReactions3': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'3'}).count();
    },
    'listReactions4': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'4'}).count();
    },
    'listReactions5': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'5'}).count();
    },
    'listReactions6': function () {
        return React.find({id_article: this._id,notread:'page',valeur:'6'}).count();
    }
});
Template.postItem.rendered = function(){

};

Template.postItem.events({
    'click .btn-modifier'() {
        Router.go('/editer/'+this._id);
    },
    'click .btn-delete'() {
        Meteor.call('removeArticle', {
            id: this._id
        }, (err, res) => {
            if (err) {
                sAlert.error(err);
            } else {
                sAlert.success('Le post a bien été supprimé!');
            }
        });
    },
    'click .imglist'(ev){
        Router.go('/'+ev.target.parentNode.parentNode.attributes['id'].value);
    },
    'click .titleCoverPreview'(ev){
        Router.go('/'+ev.target.parentNode.parentNode.attributes['id'].value);
    },
    'mouseenter .contImg'(ev){
        $(ev.target.previousElementSibling).addClass('show');
    },
    'mouseenter .control_article'(ev){
        $(ev.target).addClass('show');
    },
    'mouseleave .contImg'(ev){
        $(ev.target.previousElementSibling).removeClass('show');
    }
});

