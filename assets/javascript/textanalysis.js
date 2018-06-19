$("#tweetSearch").on("click", function () {

    var red0 = "rgba(191, 63, 63, 0.2)";
    var red1 = "rgba(191, 63, 63, 0.4)";
    var red2 = "rgba(191, 63, 63, 0.6)";
    var red3 = "rgba(191, 63, 63, 0.8)";
    var red4 = "rgba(191, 63, 63, 1)";
    var blue0 = "rgba(63, 63, 191, 0.2)";
    var blue1 = "rgba(63, 63, 191, 0.4)";
    var blue2 = "rgba(63, 63, 191, 0.6)";
    var blue3 = "rgba(63, 63, 191, 0.8)";
    var blue4 = "rgba(63, 63, 191, 1)";
    var colors = [red4, red3, red2, red1, red0, blue0, blue1, blue2, blue3, blue4];

    var queryURL = "https://apiv2.indico.io/apis/multiapi/";
    var key = "e1a39941f0bb255a046dfb5e08e6a17e";
    var apis = "apis=emotion,personality,sentiment,political,people,places,organizations";
    var tweet = $("#tweet").val().trim();
    // var tweet = "PM Justin Trudeau of Canada acted so meek and mild during our @G7 meetings only to give a news conference after I left saying that, “US Tariffs were kind of insulting” and he “will not be pushed around.” Very dishonest & weak. Our Tariffs are in response to his of 270% on dairy!";


    $.post(
        queryURL + "?" + apis,
        JSON.stringify({
            'api_key': key,
            'data': tweet
        })
    ).then(function (res) {
        main(res);
    });



    function sentimentColor(result) {
        var s = result.results.sentiment.results * 100;
        var colorChoice;
        if (s < 10) {
            colorChoice = red4;
        } if (s >= 10 && s <= 19) {
            colorChoice = red3;
        } if (s >= 20 && s <= 29) {
            colorChoice = red2;
        } if (s >= 30 && s <= 39) {
            colorChoice = red1;
        } if (s >= 40 && s <= 49) {
            colorChoice = red0;
        } if (s >= 50 && s <= 59) {
            colorChoice = blue0;
        } if (s >= 60 && s <= 69) {
            colorChoice = blue1;
        } if (s >= 70 && s <= 79) {
            colorChoice = blue2;
        } if (s >= 80 && s <= 89) {
            colorChoice = blue3;
        } if (s >= 90 && s <= 100) {
            colorChoice = blue4;
        };
        return colorChoice;
    }

    function emotionData(result) {
        var anger = result.results.emotion.results.anger * 100;
        var joy = result.results.emotion.results.joy * 100;
        var sadness = result.results.emotion.results.sadness * 100;
        var fear = result.results.emotion.results.fear * 100;
        var surprise = result.results.emotion.results.surprise * 100;

        var dat = [anger, joy, sadness, fear, surprise];
        return dat;
    }

    function politicalData(result) {
        var libertarian = result.results.political.results.Libertarian * 100;
        var green = result.results.political.results.Green * 100;
        var conservative = result.results.political.results.Conservative * 100;
        var liberal = result.results.political.results.Liberal * 100;

        var pData = [libertarian, green, conservative, liberal];
        return pData;
    }

    function createRadarDivs() {
        $("#analysis").append(
            $("<canvas>").attr("id", "emotionChart")
                .attr("class", "chart")
                .attr("width", "300px")
                .attr("height", "300px")
        );
        $("#analysis").append(
            $("<p>").attr("class", "instructions")
                .text("The chart above is analyzing the provided tweet for the probability that each of the listed emotions are being expressed.")
        );
        $("#analysis").append(
            $("<canvas>").attr("id", "politicalChart")
                .attr("class", "chart")
                .attr("width", "300px")
                .attr("height", "300px")
        );
        $("#analysis").append(
            $("<p>").attr("class", "instructions")
                .text("The chart above is analyzing the provided tweet for the probability that the text expressed is related to the political ideologies listed.")
        );
    }

    function peopleButtons(result) {
        var buttons = [];
        if (result.results.people.results.length > 0) {
            var len = result.results.people.results.length;
            for (i = 0; i < len; i++) {
                var newButtonT = result.results.people.results[i].text;
                buttons.push(newButtonT);
            }
        }

        for (i = 0; i < buttons.length; i++) {
            var b = $("<button>").text(buttons[i])
            b.attr("data-button", buttons[i]);
            b.attr("class", "searchKeyword");
            $("#buttonDiv").append(b);
        }
    }

    function placesButtons(result) {
        var buttons = [];
        if (result.results.places.results.length > 0) {
            var len = result.results.places.results.length;
            for (i = 0; i < len; i++) {
                var newButtonT = result.results.places.results[i].text;
                buttons.push(newButtonT);
            }
        }

        for (i = 0; i < buttons.length; i++) {
            var b = $("<button>").text(buttons[i])
            b.attr("data-button", buttons[i]);
            b.attr("class", "searchKeyword");
            $("#buttonDiv").append(b);
        }
    }

    function organizationsButtons(result) {
        var buttons = [];
        if (result.results.people.organizations) {
            var len = result.results.organizations.results.length;
            for (i = 0; i < len; i++) {
                var newButtonT = result.results.organizations.results[i].text;
                buttons.push(newButtonT);
            }
        }

        for (i = 0; i < buttons.length; i++) {
            var b = $("<button>").text(buttons[i])
            b.attr("data-button", buttons[i]);
            b.attr("class", "searchKeyword");
            $("#buttonDiv").append(b);
        }
    }

    function posBar() {
        $("#analysis").append($("<div>").attr("id", "positiveNegative"));
        var p = $('<p>').attr("style", "text-align:left;");
        var span = $('<span>').attr("style", "float: right;");
        span.text("More Positive")

        for (i = 0; i < colors.length; i++) {
            var div = $("<div>").attr("style", "background-color: " + colors[i]).attr("class", "posBar");
            $("#positiveNegative").append(div);
        }
        $("#positiveNegative").append(p.text("More Negative").append(span));
        $("#positiveNegative").append($("<p>").text("The colors here indicate the probability of how positive or negative the tweet is. The color corresponding to the tweet is used in the charts below."));
        
    }


    function main(res) {
        if ($("#analysis")){
           $("#analysis").empty();
           
        }
        $("#buttonDiv").html(" ");
        $("#displayAnalysis").append($("<div>").attr("id","analysis").text(" "));
        
   
        posBar();
        var result = JSON.parse(res);

        sentimentColor(result);
        var dataEmotion = emotionData(result);
        var dataPolitical = politicalData(result);
        createRadarDivs();

        new Chart(document.getElementById("emotionChart"), {
            type: "radar",
            data: {
                labels: ["Anger", "Joy", "Sadness", "Fear", "Surprise"],
                datasets: [{
                    label: "Selected Tweet",
                    data: dataEmotion,
                    backgroundColor: sentimentColor(result),
                    borderColor: sentimentColor(result),
                    pointBackgroundColor: sentimentColor(result),
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: sentimentColor(result)
                }]
            },
            options: {
                responsive: false,
                legend: false,
                elements: {
                    line: {
                        tension: 0, borderWidth: 3
                    }
                }
            }
        });

        new Chart(document.getElementById("politicalChart"), {
            type: "radar",
            data: {
                labels: ["Libertarian", "Green", "Conservative", "Liberal"],
                datasets: [{
                    //label: "Selected Tweet",
                    data: dataPolitical,
                    fill: true,
                    backgroundColor: sentimentColor(result),
                    borderColor: sentimentColor(result),
                    pointBackgroundColor: sentimentColor(result),
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: sentimentColor(result)
                }]
            },
            options: {
                responsive: false,
                legend: false,
                elements: {
                    line: {
                        tension: 0, borderWidth: 3
                    }
                }
            }
        });

        $("#displayAnalysis").append($("<div>").attr("id", "buttonDiv"));
        peopleButtons(result);
        placesButtons(result);
        organizationsButtons(result);

    };


});