let nbInPageCom = 10;
let pageNumberCom = new ReactiveVar(0);
let noMoreItemCom = new ReactiveVar(false);
let loadingItemsCom = new ReactiveVar(false);
let nbItemsCom = new ReactiveVar(0);
let statusCom = true;
let lastScrollTop = 0;
//let nombreCom = new ReactiveVar(Comments.find({parentArticle:Router.current().params._id}).fetch().length);

    setNbItemsCom = function(){
        let nbItemsCom = Comments.find({parentArticle:Router.current().params._id}).count();
        let nbRestItemsCom = Comments.find({parentArticle:Router.current().params._id}).count() - $('.commentItem').length;
        $('#nbComments').html(nbItemsCom+' commentaires');
        let pluriel = '';
        if (nbRestItemsCom > 1) pluriel = 's'
        $('.nbItems').html('il reste encore '+nbRestItemsCom+' commentaire'+pluriel);
        return nbItemsCom;
    };

    Template.comments.rendered = function () {
        pageNumberCom.set(0);
        this.autorun(() => {
            Meteor.subscribe('commentaires', this.data._id, pageNumberCom.get(), nbInPageCom);
            Meteor.subscribe('countCom', Router.current().params._id);
        });
        //Comments.find({parentArticle:Router.current().params._id}).fetch()
    };
    Template.comments.events({
        'click .viewMore'(event){
            loadingItemsCom.set(true);
            if(pageNumberCom.get() < Math.floor(Counts.get('countCom')/nbInPageCom)) {
                pageNumberCom.set(Number(pageNumberCom.get())+1);
                let handle = Template.instance().subscribe('commentaires', this._id, pageNumberCom.get(), nbInPageCom);
                Tracker.autorun(function() {
                    if (handle.ready())
                        loadingItemsCom.set(false);
                    setNbItems();
                });
            } else {
                noMoreItemCom.set(true);
                loadingItemsCom.set(false);
                nbItemsCom.set(false);
                statusCom = false;
            }
        }
    });

Template.comments.helpers({
    'dataArrCom': function () {

        return Comments.find({parent: null,parentArticle:this._id},{});
    },
    'dataArrComRep': function () {
        return Comments.find({parent:this.parent});
    },
    'noMoreItemCom': function () {
        return noMoreItemCom.get();
    },
    'loadingItemsCom': function () {
        return loadingItemsCom.get();
    },
    'nbItemsCom': function () {
        setNbItemsCom();
        return nbItemsCom.get();
    }
});