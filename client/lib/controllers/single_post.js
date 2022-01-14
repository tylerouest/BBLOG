SinglePostController = BaseController.extend({
    template: 'postPage',

    waitOn: function(){
        Meteor.subscribe('reactionsPage',this.params._id);
        return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() {
            React.find({id_article:this.params._id,notread:'page'});
        return Posts.findOne(this.params._id);
    }
});