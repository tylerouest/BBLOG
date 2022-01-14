Template.navigation.events({
    'click .navig.droite'(event) {
        if (setNavigation(this) < PostsList.length-1){
            Router.go('/'+PostsList[setNavigation(this)+1]._id)
        }else{
            $('.navig.droite').css('opacity','0.5');
        }

    },
    'click .navig.gauche'(event) {
        if (setNavigation(this) >= 1){
            Router.go('/'+PostsList[setNavigation(this)-1]._id)
        }else{
            $('.navig.gauche').css('opacity','0.5');
        }
    }
});
setNavigation = function(instance){
    for(var i=0;i<PostsList.length;i++){
        var value = PostsList[i]._id;
        if(value == Template.instance()._id){
            return i;
        }
    }
    return false;
};
Template.navigation.rendered = function () {
    PostsList = Posts.find().fetch();
    if (setNavigation(this.data) < PostsList.length-1){
        $('.navig.droite').css('opacity','1');
    }else{
        $('.navig.droite').css('opacity','0.5');
    }
    if (setNavigation(this.data) >= 1){
        $('.navig.gauche').css('opacity','1');
    }else{
        $('.navig.gauche').css('opacity','0.5');
    }
};
Template.navigation.helpers({
    'nbReactPage': function () {

    }
});
