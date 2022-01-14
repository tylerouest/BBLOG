Template.test.events({
    'mousewheel'(event) {

    },
    'click input[type="radio"]'(event) {
        let index = ($(event.target.parentNode.parentNode.parentNode).index()+1);
        let max = Counts.get('countQuestions')
        let index_perc = 100/max;

        if(index>=max){
            $('.progress-bar').css('width',(index_perc*index)+'%');
            $('.progress-bar').addClass('finish');
            var htmlvar = "Découvrez votre résultat";
            $('#submit').fadeIn();
            $('#results').fadeIn();
        }else{
            $('.progress-bar').css('width',(index_perc*index)+'%');
        }
    },
    'click #submit'(event) {
        MbtiModule.processForm();

    }

});
Template.test.rendered = function () {

};
Template.test.helpers({
    'questions': function () {
        return Questions.find();
    }
});

MbtiModule = (function() {
    let types = {
        ISTJ: {title: "Logisticien", percentage: "13.7%", description: "Dutiful, Practical, Logical, Methodical", site: "http://www.personalitypage.com/html/ISTJ.html"},
        ISFJ: {title: "Défenseur", percentage: "12.7%", description: "Dutiful, Practical, Supportive, Meticulous", site: "http://www.personalitypage.com/html/ISFJ.html"},
        INFJ: {title: "Avocat", percentage: "1.7%", description: "Devoted, Innovative, Idealistic, Compassionate", site: "http://www.personalitypage.com/html/INFJ.html"},
        INTJ: {title: "Architecte", percentage: "1.4%", description: "Independent, Innovative, Analytical, Purposeful", site: "http://www.personalitypage.com/html/INTJ.html"},
        ISTP: {title: "Virtuose", percentage: "6.4%", description: "Expedient, Practical, Objective, Adaptable", site: "http://www.personalitypage.com/html/ISTP.html"},
        ISFP: {title: "Aventurier", percentage: "6.1%", description: "Tolerant, Realistic, Harmonious, Adaptable", site: "http://www.personalitypage.com/html/ISFP.html"},
        INFP: {title: "Médiateur", percentage: "3.2%", description: "Insightful, Innovative, Idealistic, Adaptable", site: "http://www.personalitypage.com/html/INFP.html"},
        INTP: {title: "Logicien", percentage: "2.4%", description: "Questioning, Innovative, Objective, Abstract", site: "http://www.personalitypage.com/html/INTP.html"},
        ESTP: {title: "Entrepreneur", percentage: "5.8%", description: "Energetic, Practical, Pragmatic, Spontaneous", site: "http://www.personalitypage.com/html/ESTP.html"},
        ESFP: {title: "Amuseur", percentage: "8.7%", description: "Spontaneous, Practical, Friendly, Harmonious", site: "http://www.personalitypage.com/html/ESFP.html"},
        ENFP: {title: "Inspirateur", percentage: "6.3%", description: "Optimistic, Innovative, Compassionate, Versatile", site: "http://www.personalitypage.com/html/ENFP.html"},
        ENTP: {title: "Innovateur", percentage: "2.8%", description: "Risk-Taking, Innovative, Outgoing, Adaptable", site: "http://www.personalitypage.com/html/ENTP.html"},
        ESTJ: {title: "Directeur", percentage: "10.4%", description: "Organized, Practical, Logical, Outgoing", site: "http://www.personalitypage.com/html/ESTJ.html"},
        ESFJ: {title: "Consul", percentage: "12.6%", description: "Friendly, Practical, Loyal, Organized", site: "http://www.personalitypage.com/html/ESFJ.html"},
        ENFJ: {title: "Protagoniste", percentage: "2.8%", description: "Friendly, Innovative, Supportive, Idealistic", site: "http://www.personalitypage.com/html/ENFJ.html"},
        ENTJ: {title: "Commandant", percentage: "2.9%", description: "Determined, Innovative, Strategic, Outgoing", site: "http://www.personalitypage.com/html/ENTJ.html"}
    };
    let e, i, s, n, t, f, j, p;
    let type;
    function resetScores() {
        e = i = s = n = t = f = j = p = 0;
        type = "";
    }
    function getScores() {
        const inputs = document.getElementsByTagName("input");
        Array.prototype.forEach.call(inputs, function(input) {
            if (input.checked) {
                switch(input.value) {
                    case 'E': e++; break;
                    case 'I': i++; break;
                    case 'S': s++; break;
                    case 'N': n++; break;
                    case 'T': t++; break;
                    case 'F': f++; break;
                    case 'J': j++; break;
                    case 'P': p++; break;
                }
            }
        });
    }
    function calculatePercentages() {
        e = Math.floor(e / 10 * 100);
        i = Math.floor(i / 10 * 100);
        s = Math.floor(s / 20 * 100);
        n = Math.floor(n / 20 * 100);
        t = Math.floor(t / 20 * 100);
        f = Math.floor(f / 20 * 100);
        j = Math.floor(j / 20 * 100);
        p = Math.floor(p / 20 * 100);
    }
    function createCharts() {
        $($('.bar')[0]).removeClass('bar-1').addClass('bar-'+i);
        $($('.bar')[1]).removeClass('bar-1').addClass('bar-'+n);
        $($('.bar')[2]).removeClass('bar-1').addClass('bar-'+f);
        $($('.bar')[3]).removeClass('bar-1').addClass('bar-'+p);
    }
    function scrollTo(id){
        document.getElementById(id).scrollIntoView({behavior: "smooth"});
    }
    function showResults() {
        $('#results .container').fadeIn()
        console.log(e+' vs '+i)
        console.log(s+' vs '+n)
        console.log(t+' vs '+f)
        console.log(j+' vs '+p)
        type += (e >= i) ? "E" : "I";
        type += (s >= n) ? "S" : "N";
        type += (t >= f) ? "T" : "F";
        type += (j >= p) ? "J" : "P";

        $("#type").html(type) ;
        if(type[0] == "E"){
            $('#letter0').html('Extravertion');
            $('.fperc').text(e+'%')

        }else{
            $('#letter0').html('Introvertion');
            $('.fperc').text(i+'%')
        }
        if(type[1] == "S"){
            $('#letter1').html('Sensation');
            $('.fperc1').text(s+'%')
        }else{
            $('#letter1').html('Intuition');
            $('.fperc1').text(n+'%')
        }
        if(type[2] == "T"){
            $('#letter2').html('Pensée');
            $('.fperc2').text(t+'%')
        }else{
            $('#letter2').html('Sentiments');
            $('.fperc1').text(f+'%')
        }
        if(type[3] == "J"){
            $('#letter3').html('Jugement');
            $('.fperc3').text(j+'%')
        }else{
            $('#letter3').html('Perception');
            $('.fperc3').text(p+'%')
        }
        document.querySelector("#type-title").innerHTML = types[type].title;
        document.querySelector("#type-percentage").innerHTML = types[type].percentage;
        document.querySelector("#type-description").innerHTML = types[type].description;
        document.querySelector("#type-site").href = types[type].site;

        document.querySelector("#type-details").classList.remove("hidden");
        document.querySelector("#results").classList.remove("hidden");
        $('.content').fadeIn();
        $('#results').fadeIn();
        scrollTo("results");
    }
    return {
        processForm: function() {
            resetScores();
            getScores();
            calculatePercentages();
            createCharts();
            showResults();
        }
    };
})();