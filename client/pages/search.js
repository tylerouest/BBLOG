let SearchnbInPage = 4;
let SearchpageNumber = new ReactiveVar(0);
let SearchnoMoreItem = new ReactiveVar(false);
let SearchloadingItems = new ReactiveVar(false);
let SearchnbItems = new ReactiveVar(true);
let SearchlastScrollTop = 0;
let Searchstatus = true;


setSearchnbItems = function(){
    let SearchnbItems = Counts.get('countItems') - $('.article').length;
    let pluriel = '';
    if (SearchnbItems > 1) pluriel = 's'
    $('.SearchnbItems').html('il reste encore '+SearchnbItems+' article'+pluriel);
    return SearchnbItems;
};
Template.Search.rendered = function () {
    //$('.container').addClass('w200');
    let searchTerms = Router.current().params.searchTerms
    $('#search').val(searchTerms);
    let regex = new RegExp( searchTerms, 'i' );
    let query = { title: regex };

    SearchpageNumber.set(0);
     handle_start = null;
    switch ($('.control_search .btn.active').html()) {
        case'articles':
            handle_start = Meteor.subscribe('searchPosts', query, SearchpageNumber.get(), SearchnbInPage);
            break;
        case'membres':
            handle_start = Meteor.subscribe('searchMembres', query, SearchpageNumber.get(), SearchnbInPage);
            break;
        case'autres':
            break;
        default:

    }
        Meteor.subscribe('pubName', 0, 100);

};
Template.Search.events({
    'click .control_search .btn'(event) {
        $('.control_search .btn').removeClass('active');
        $(event.target).addClass('active');

        let searchTerms = Router.current().params.searchTerms
        $('#search').val(searchTerms);
        let regex = new RegExp( searchTerms, 'i' );
        let query = { title: regex };

        SearchpageNumber.set(0);

        handle_start.stop();
        handle_start = Meteor.subscribe('pubUserList', searchTerms, SearchpageNumber.get(), SearchnbInPage);
        Router.go('/membres/'+searchTerms)
    },
    'mousewheel'(event) {
        let nb = setSearchnbItems();
        if (nb <= 0){
            SearchnoMoreItem.set(true);
            SearchloadingItems.set(false);
            SearchnbItems.set(false);
            Searchstatus = false;
        }
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 50 && Searchstatus == true) {
            SearchloadingItems.set(true);
            let scrollTop = $(window).scrollTop();
            if(scrollTop > SearchlastScrollTop){
                if(SearchpageNumber.get() < Math.floor(Counts.get('countItems')/SearchnbInPage)) {
                    SearchpageNumber.set(Number(SearchpageNumber.get())+1);
                    let regex = new RegExp( Router.current().params.searchTerms, 'i' );
                    let query = { title: regex };
                    let handle = null;
                    switch ($('.control_search .btn.active').html()) {
                            case'articles':
                                handle = Template.instance().subscribe('searchPosts', query, SearchpageNumber.get(), SearchnbInPage);
                            break;
                            case'membres':
                                handle = Template.instance().subscribe('searchMembres', query, SearchpageNumber.get(), SearchnbInPage);
                            break;
                            case'autres':
                            break;
                        default:

                    }
                    Tracker.autorun(function() {
                        if (handle.ready())
                            SearchloadingItems.set(false);
                        setSearchnbItems();
                    });
                } else {
                    SearchnoMoreItem.set(true);
                    SearchloadingItems.set(false);
                    SearchnbItems.set(false);
                    Searchstatus = false;
                }
            }
            SearchlastScrollTop = scrollTop;
        }

    }
});
Template.Search.helpers({
    'dataArrSearch': function () {
        let regex = new RegExp( Router.current().params.searchTerms, 'i' );
        let query = { title: regex };
        return Posts.find(query);
    },
    'SearchnoMoreItem': function () {
        return SearchnoMoreItem.get();
    },
    'SearchloadingItems': function () {
        return SearchloadingItems.get();
    },
    'SearchnbItems': function () {
        setSearchnbItems();
        return SearchnbItems.get();
    }
});

