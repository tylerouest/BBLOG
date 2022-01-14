let nbInPageCom = 10;
pageNumberCom = new ReactiveVar(0);
let noMoreItemCom = new ReactiveVar(false);
let loadingItemsCom = new ReactiveVar(false);
let nbItemsCom = new ReactiveVar(true);
let statusCom = true;
let lastScrollTop = 0;


Template.postPage.events({
    'mousewheel'(event) {
        if($(window).scrollTop() + $(window).height() >= $('.page.pageArticle').height()+200){
            $('.nbItems').addClass('show');
            $('#new_comment').addClass('show');
        }else{
            $('.nbItems').removeClass('show');
            $('#new_comment').removeClass('show');
        }
        if (setNbItemsCom() <= 0){
            noMoreItemCom.set(true);
            loadingItemsCom.set(false);
            nbItemsCom.set(false);
            //statusCom = false;
        }else{
            if($(window).scrollTop() + $(window).height() >= $(document).height() - 50 && statusCom == true) {
                loadingItemsCom.set(true);
                let scrollTop = $(window).scrollTop();
                if(scrollTop > lastScrollTop){
                    if(pageNumberCom.get() < Math.floor(Counts.get('countCom')/nbInPageCom)) {
                        pageNumberCom.set(Number(pageNumberCom.get())+1);
                        let handle = Template.instance().subscribe('commentaires', $('.pageArticle').attr('idarticle'), pageNumberCom.get(), nbInPageCom);
                        Tracker.autorun(function() {
                            if (handle.ready()) {
                                loadingItemsCom.set(false);
                                setNbItems();
                            }
                        });
                    } else {
                        noMoreItemCom.set(true);
                        loadingItemsCom.set(false);
                        nbItemsCom.set(false);
                        //statusCom = false;
                    }
                }
                lastScrollTop = scrollTop;
            }
        }
    },
    'mouseenter .boutons img'(event) {
        event.target.nextElementSibling.children[0].style.visibility = 'visible'
        event.target.nextElementSibling.children[0].style.opacity = '1'
    },
    'mouseenter .react img'(event) {
        event.target.nextElementSibling.children[0].style.visibility = 'visible'
        event.target.nextElementSibling.children[0].style.opacity = '1'
    },
    'mouseleave .boutons img'(event) {
        event.target.nextElementSibling.children[0].style.visibility = 'hidden'
        event.target.nextElementSibling.children[0].style.opacity = '0'
    },
    'mouseleave .react img'(event) {
        event.target.nextElementSibling.children[0].style.visibility = 'hidden'
        event.target.nextElementSibling.children[0].style.opacity = '0'
    },
    'mouseenter .reactionArticle'(event) {
        $('.reactArticle').html('');
        var node = document.createElement("div");
        document.body.appendChild(node);
        UI.renderWithData(Template['emoji'], null, node);
        $('.reactArticle').html(node);
    },
    'mouseleave .pageArticle'(event) {
        $('.reactArticle').html('');
    },
    'click .downloadArticle'(event){
        Meteor.pdf.save('<h1>My Cool Pdf</h1>', 'myFileName');
    },
    'click #prev'(event){
        Posts.find({createdAt: {$lt: new Date()}}, {sort: {date: -1}, limit:1});
    },
    'click .editArticle'(event){
        Router.go('/editer/'+this._id);
    },
    'click #next'(event){
        Posts.find({createdAt: {$gt: new Date()}}, {sort: {date: 1}, limit:1});
    }

});

Template.postPage.rendered = function () {
    let classe = '';
    switch (this.data.url_img2) {
        case'green.jpg':
            classe = 'vert';
            break;
        case'red.png':
            classe = 'orange';
            break;
        case'blue.jpg':
            classe = 'bleu';
            break;
        case'purple.jpg':
            classe = 'violet';
            break;
    }
    $('#view')[0].classList.value = classe;

    this.autorun(() => {
        Meteor.subscribe('countCom',Router.current().params._id);
    });
    new simpleParallax(document.getElementsByClassName('cover'), {
        delay: .4,
        transition: 'cubic-bezier(0,0,0,1)'
    });
};
Template.postPage.helpers({
    'nbReactPage': function () {
        return React.find({notread:'page', id_article:this._id}).count();
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