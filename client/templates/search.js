Template.search.rendered = function (event) {
    $('#search').val(Router.current().params.searchTerms);

};
let timer = '';
Template.search.events({
    'keyup input'(e){
        switch (e.which) {
            case 13:
                //Router.go('/search/'+e.target.value);
                searchTerms(e.target.value);
                break;
            case 27:
                //échap
                break;
            default:
                clearTimeout(timer);
                if (e.target.value.length >= 2){
                    timer = Meteor.setTimeout(function(){
                        //Router.go('/search/'+e.target.value);
                        searchTerms(e.target.value);
                    },300);
                }

        }
    },
    'click .btn_search'(e){
        //Router.go('/search/'+e.target.parentNode.children[0].value);
        searchTerms(e.target.parentNode.children[0].value);
        $('#search').focus();
    },
    'focusin input#search'(event){
        $('.searchBox').addClass('focus')
        if (event.target.value != ''){
            //Router.go('/search/'+event.target.value);
            searchTerms(event.target.value);
        }
    },
    'focusout input#search'(event){
        $('.searchBox').removeClass('focus')
    }
});

searchTerms = function(terms){
    Router.go('/search/'+terms);
}