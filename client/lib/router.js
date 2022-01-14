Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'load',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'root',
    controller: 'MainPageController'
});
Router.route('/membres/:searchTerms', {
    name: 'userList',
    controller: 'UserController'
});
Router.route('/search/:searchTerms', {
    name: 'Search',
    controller: 'BaseController'
});
Router.route('/compte', {
    name: 'compte',
    controller: 'CompteController'
});

Router.route('/parametres', {
    name: 'parametres',
    controller: 'parametresController'
});

Router.route('/nouveau', {
    name: 'newPost',
    controller: 'BaseController'
});
Router.route('/test', {
    name: 'test',
    controller: 'TestController'
});
Router.route('/edit-test', {
    name: 'editTest',
    controller: 'TestController'
});

Router.route('/:_id', {
    name: 'singlePost',
    controller: 'SinglePostController'
});
Router.route('/editer/:_id', {
    name: 'editPost',
    controller: 'EditPostController'
});
Router.route('/profil/:_id', {
    name: 'userProfil',
    controller: 'UserProfilController'
});
Router.route('/Emsg/:_id', {
    name: 'Emsg',
    controller: 'EmsgController'
});

Router.onBeforeAction(function(e) {
    if (this.ready()) {
        this.render();
    } else {
        this.render('load');
        //this.render('first_load');
    }
    this.next();
});

Router.onBeforeAction(function() {
    this.render('load');
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        if (this.ready()) {
            this.render();
        } else {
            this.render('load');
        }
        this.next();
    }
}, {only: ['newPost','admin']});

Router.onAfterAction(function(e) {

    //if (!this.ready()) this.render('first_load');

    $('.drop-down--active').removeClass('drop-down--active');
    if (this.ready()) {
        let hash = this.params.hash;
        let id = this.params._id;
        if (typeof hash != 'undefined' && hash != "" && hash != null){
            Meteor.setTimeout(function(){
                //debugger;
                window.scrollBy(0,$('#'+hash)[0].offsetTop - 51);
                $('#'+hash+'.containerComment').add('#'+hash).addClass("hight").delay(2000).queue(function(){
                    $(this).removeClass("hight").dequeue();
                });
                try{
                    //$('#'+hash)[0].scrollIntoView()
                }catch (e) {
                    if (e.message == "Cannot read property 'scrollIntoView' of undefined") sAlert.info("L'élément est introuvable !")
                }

            },700,hash,id);
        }
    }
    if (Router.current().options.route.options.name === 'Emsg'){
        $('.container').addClass('w200');
        $('.navbar').addClass('flat');
    }else{
        $('.container').removeClass('w200');
        $('.navbar').removeClass('flat');
    }
    Tracker.autorun(function () {
        if (Meteor.userId()) {
            try {
                UserState.UserStatus.startMonitor({
                    threshold: 30000,
                    interval: 1000,
                    idleOnBlur: true
                });
            } catch(err) {
                //console.log(err);
            }
        } else {
            UserState.UserStatus.stopMonitor();
        }
    });
});
