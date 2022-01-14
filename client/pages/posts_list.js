nbInPage = 6;
pageNumber = new ReactiveVar(0);
let noMoreItem = new ReactiveVar(false);
let loadingItems = new ReactiveVar(true);
let nbItems = new ReactiveVar(true);
let lastScrollTop = 0;
let status = true;

Template.postsList.rendered = function () {
    Meteor.subscribe('pubName', 0, nbInPage, function(){
        loadingItems.set(false);
    });
};
Template.postsList.events({
    'mousewheel'() {
        let nb = setNbItems();
        if (nb <= 0){
            noMoreItem.set(true);
            //loadingItems.set(false);
            nbItems.set(false);
            status = false;
        }else{
            noMoreItem.set(false);
            //loadingItems.set(true);
            nbItems.set(nb);
            status = true;
        }
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 20 && status == true) {
            loadingItems.set(true);
            let scrollTop = $(window).scrollTop();

            if(scrollTop > lastScrollTop){
                if(pageNumber.get() < Math.floor(Counts.get('countItems')/nbInPage)) {
                    pageNumber.set(Number(pageNumber.get())+1);

                    let handle = Meteor.subscribe('pubName', pageNumber.get(), nbInPage);
                    Tracker.autorun(function() {
                        if (handle.ready()){
                            loadingItems.set(false);
                            setNbItems();
                        }
                    });
                } else {
                    noMoreItem.set(true);
                    loadingItems.set(false);
                    nbItems.set(false);
                    status = false;
                }
            }
            lastScrollTop = scrollTop;
        }

    }
});
Template.postsList.helpers({
    'dataArr': function () {
        return Posts.find();
    },
    'noMoreItem': function () {
        return noMoreItem.get();
    },
    'loadingItems': function () {
        return loadingItems.get();
    },
    'nbItems': function () {
        setNbItems();
        return nbItems.get();
    }
});

setNbItems = function(){
    let nbitems = Counts.get('countItems') - $('.article').length;
    let pluriel = '';
    if (nbitems > 1) pluriel = 's'
    $('.nbItems').html('il reste encore '+nbitems+' article'+pluriel);
    return nbitems;
};