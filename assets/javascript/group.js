//Create empty variable for user to be filled in after text is entered 
var userName = "";
var politician = "";
var searchterm = "";
//function that accesses the NYT and Guardian API's and adds 5 headlines/URLs to screen
function headlines() {
    $("#displayArticles").html("<h3>" + politician + " in the news" + "</h3>" + "<br>");
    var queryGuardianURL = "https://content.guardianapis.com/search?page-size=5&order-by=newest&q=%22" + politician + "%22&api-key=152a7745-630a-46f3-8a3e-b776a965e1e8";
    $.ajax({
        url: queryGuardianURL,
        method: "GET"
    }).then(function (data) {
        //Array that returns the first 5 results
        var GuardianArticles = [data.response.results[0], data.response.results[1], data.response.results[2], data.response.results[3], data.response.results[4],]
        //For loop that adds each result to the page dynamically
        for (var i = 0; i < GuardianArticles.length; i++) {
            var article = data.response.results[i];
            var $articleList = $("<ul>");
            $articleList.addClass("list-group");
            $("#displayArticles").append($articleList);
            var source = "<h5> From the Guardian: </h5>";
            var headline = article.webTitle;
            var $articleListItem = $("<li class='list-group-item articleHeadline'>");
            $articleListItem.append("<a href='" + article.webUrl + "'>" + "<strong> " + headline + "</strong>" + "</a>");
            $articleList.append(source, $articleListItem);
        }
    })
    var queryNYTURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=2ad99af66aeb468e98d92f03183511e6&q=" + politician;
    $.ajax({
        url: queryNYTURL,
        method: "GET"
    }).then(function (data) {
        var NYTArticles = [data.response.docs[0], data.response.docs[1], data.response.docs[2], data.response.docs[3], data.response.docs[4],]
        for (var j = 0; j < NYTArticles.length; j++) {
            var Timesarticle = data.response.docs[j];
            var $articleList = $("<ul>");
            $articleList.addClass("list-group");
            $("#displayArticles").append($articleList);
            var NYTsource = "<h5> From the New York Times: </h5>";
            var NYTheadline = Timesarticle.headline.main;
            var $articleListItem = $("<li class='list-group-item articleHeadline'>");
            $articleListItem.append("<a href='" + Timesarticle.web_url + "'>" + "<strong> " + NYTheadline + "</strong>" + "</a>");
            $articleList.append(NYTsource, $articleListItem);
        }
    });
}

var cabinet = [
    "Donald Trump", "Mike Pence", "Jeff Sessions", "Scott Pruitt", "Linda E. McMahon", "Daniel Coats", "Gina Haspel", "Mick Mulvaney", "Nikki R. Haley", "Sonny Perdue", "Wilbur Ross Jr.",
    "James Mattis", "Elisabeth Prince DeVos", "James Richard Perry", "Alex Azar", "Kirstjen Nielsen", "Benjamin S. Carson Sr.", "Ryan Zinke", "Alexander Acosta", "Mike Pompeo", "Elaine L. Chao", "Steven T. Mnuchin", "Robert Lighthizer", "John F. Kelly",
    "Alexander Lamar", "Baldwin Tammy", "Barrasso John", "Bennet Michael", "Blumenthal Richard", "Blunt Roy", "Booker Cory", "Boozman John", "Brown Sherrod", "Burr Richard", "Cantwell Maria", "Capito Shelley Moore", "Cardin Benjamin", "Carper Thomas",
    "Casey Robert", "Cassidy Bill", "Collins Susan", "Coons Christopher", "Corker Bob", "Cornyn John", "Cortez Masto Catherine", "Cotton Tom", "Crapo Mike", "Cruz Ted", "Daines Steve", "Donnelly Joe", "Duckworth Tammy", "Durbin Richard", "Enzi Michael",
    "Ernst Joni", "Feinstein Dianne", "Fischer Deb", "Flake Jeff", "Gardner Cory", "Gillibrand Kirsten", "Graham Lindsey", "Grassley Chuck", "Harris Kamala", "Hassan Margaret Wood", "Hatch Orrin", "Heinrich Martin", "Heitkamp Heidi", "Heller Dean", "Hirono Mazie",
    "Hoeven John", "Hyde-Smith Cindy", "Inhofe James", "Isakson Johnny", "Johnson Ron", "Kaine Tim", "Kennedy John", "King Angus", "Jones Doug", "Klobuchar Amy", "Lankford James", "Leahy Patrick", "Lee Mike", "Manchin Joe", "Markey Edward", "McCain John",
    "McCaskill Claire", "McConnell Mitch", "Menendez Robert", "Merkley Jeff", "Moran Jerry", "Murkowski Lisa", "Murphy Christopher", "Murray Patty", "Nelson Bill", "Paul Rand", "Perdue David", "Peters Gary C", "Portman Rob", "Reed Jack", "Risch James E", "Roberts Pat",
    "Rounds Mike", "Rubio Marco", "Sanders Bernard", "Sasse Ben", "Schatz Brian", "Schumer Charles", "Scott Tim", "Shaheen Jeanne", "Shelby Richard", "Smith Tina", "Stabenow Debbie", "Sullivan Dan", "Tester Jon", "Thune John", "Tillis Thom", "Toomey Patrick", "Udall Tom",
    "Van Hollen Chris", "Warner Mark", "Warren Elizabeth", "Whitehouse Sheldon", "Wicker, Roger", "Wyden Ron", "Young Todd"
];
var cabinetNames = [
    "Donald Trump, POTUS", "Mike Pence, Vice President", "Jeff Sessions, Attorney General", "Scott Pruitt, Administrator of the Environmental Protection Agency", "Linda McMahon, Administrator of the Small Business Administration", "Dan Coats, Director of National Intelligence", "Gina Haspel, Director of the Central Intelligence Agency ", "Mick Mulvaney, Director of the Office of Management and Budget ", "Nikki Haley, Representative of the United States to the United Nations ", "Sonny Perdue, Secretary of Agriculture ", "Wilbur Ross, Secretary of Commerce",
    "James Mattis, Secretary of Defense ", "Betsy DeVos, Secretary of Education ", "Rick Perry, Secretary of Energy ", "Alex Azar, Secretary of Health and Human Services", "Kirstjen Nielsen, Secretary of Homeland Security ", "Ben Carson, Secretary of Housing and Urban Development ", "Ryan Zinke, Secretary of the Interior ", "Alex Acosta, Secretary of Labor", "Mike Pompeo, Secretary of State", "Elaine Chao, Secretary of Transportation ", "Steven Mnuchin, Secretary of the Treasury", "Robert Lighthizer, U.S. Trade Representative", "John Kelly, White House Chief of Staff ",
    "Lamar Alexander, R - TN ", "Tammy Baldwin, D - WI", "John Barrasso, R - WY ", "Michael Bennet, D - CO", "Richard Blumenthal, D - CT", "Roy Blunt, R - MO", "Cory Booker, D - NJ", "John Boozman, R - AR ", "Sherrod Brown, D - OH", "Richard Burr, R - NC", "Maria Cantwell, D - WA", "Shelley Moore Capito, R - WV", "Ben Cardin, D - MD ", "Tom Carper, D - DE",
    "Bob Casey, D - PA ", "Bill Cassidy, R - LA", "Susan Collins, R - ME ", "Chris Coons, D - DE ", "Bob Corker, R - TN", "John Cornyn, R - TX", "Catherine Cortez Masto, D - NV", "Tom Cotton, R - AR", "Mike Crapo, R - ID", "Ted Cruz, R - TX", "Steve Daines, R - MT", "Joe Donnelly, D - IN", "Tammy Duckworth, D - IL ", "Dick Durbin, D - IL", "Mike Enzi, R - WY",
    "Joni Ernst, R - IA", "Dianne Feinstein, D - CA", "Deb Fischer, R - NE", "Jeff Flake, R - AZ", "Cory Gardner, R - CO", "Kirsten Gillibrand, D - NY", "Lindsey Graham, R - SC ", "Chuck Grassley, R - IA", "Kamala Harris, D - CA", "Maggie Hassan, D - NH", "Orrin Hatch, R - UT", "Martin Heinrich, D - NM", "Heidi Heitkamp, D - ND", "Dean Heller, R - NV", "Mazie Hirono, D - HI",
    "John Hoeven, R - ND", "Cindy Hyde-Smith, R - MS", "Jim Inhofe, R - OK", "Johnny Isakson, R - GA", "Ron Johnson, R - WI", "Tim Kaine, D - VA", "John Kennedy, R - LA ", "Angus King, I - ME", "Doug Jones, D - AL", "Amy Klobuchar, D - MN", "James Lankford, R - OK", "Patrick Leahy, D - VT ", "Mike Lee, R - UT", "Joe Manchin, D - WV", "Ed Markey, D - MA", "John McCain, R - AZ",
    "Claire McCaskill, D - MO", "Mitch McConnell, R - KY", "Bob Menendez, D - NJ", "Jeff Merkley, D - OR", "Jerry Moran, R - KS", "Lisa Murkowski, R - AK", "Chris Murphy, D - CT", "Patty Murray, D - WA", "Bill Nelson, D - FL", "Rand Paul, R - KY", "David Perdue, R - GA", "Gary Peters, D - MI", "Rob Portman, R - OH", "Jack Reed, D - RI", "Jim Risch, R - ID", "Pat Roberts,R - KS",
    "Mike Rounds, R - SD ", "Marco Rubio, R - FL", "Bernie Sanders, I - VT", "Ben Sasse, R - NE", "Brian Schatz, D - HI", "Chuck Schumer, D - NY", "Tim Scott, R - SC", "Jeanne Shaheen, D - NH", "Richard Shelby, R - AL", "Tina Smith, D - MN", "Debbie Stabenow, D - MI", "Dan Sullivan, R - AK", "Jon Tester, D - MT", "John Thune, R - SD", "Thom Tillis, R - NC", "Pat Toomey,R - PA ", "Tom Udall, D - NM"
];
var twit = [
    "@realDonaldTrump", "@VP", "@jeffsessions", "@EPAScottPuritt", "@SBALinda", "@dcoatsxvi", "@GinaHospel", "@MickMulvaneyOMB", "@nikkihaley", "@SecretarySonny", "@SecretaryRoss",
    "@jamesnormanmattis", "@BetsyDeVosED", "@SecretaryPerry", "@SecAzar‏", "@SecNielsen", "@SecretaryCarson‏", "@SecretaryZinke", "@SecretaryAcosta", "@SecPompeo‏", "@SecElaineChao", "@stevenmnuchin1", "@RobertLighthiz1", "@WhiteHouse",
    "@LamarAlexander", "@SenatorBaldwin", "@SenJohnBarrasso", "@SenBennetCO", "@SenBlumenthal", "@RoyBlunt", "@CoryBooker", "@JohnBoozman", "@SherrodBrown", "@SenatorBurr", "@SenatorCantwell", "@SenCapito", "@SenatorCardin", "@SenatorCarper",
    "@SenBobCasey", "@BillCassidy", "@SenatorCollins", "@ChrisCoons", "@SenBobCorker", "@JohnCornyn", "@SenCortezMasto", "@SenTomCotton", "@MikeCrapo", "@SenTedCruz", "@SteveDaines", "@SenDonnelly", "@SenDuckworth", "@SenatorDurbin", "@SenatorEnz",
    "@joniernst", "@SenFeinstein", "@SenatorFischer", "@JeffFlake", "@CoryGardner", "@SenGillibrand", "@LindseyGrahamSC", "@ChuckGrassley", "@SenKamalaHarris", "@SenatorHassan", "@senorrinhatch", "@MartinHeinrich", "@SenatorHeitkamp", "@SenDeanHeller", "@maziehirono",
    "@SenJohnHoeven", "@SenHydeSmith", "@JimInhofe", "@SenatorIsakson", "@SenRonJohnson", "@timkaine", "@SenJohnKennedy", "@SenAngusKing", "@DougJones", "@amyklobuchar", "@SenatorLankford", "@SenatorLeahy", "@SenMikeLee", "@Sen_JoeManchin", "@SenMarkey", "@SenJohnMcCain",
    "@McCaskillOffice", "@SenateMajLdr", "@SenatorMenendez", "@SenJeffMerkley", "@JerryMoran", "@lisamurkowski", "@ChrisMurphyCT", "@PattyMurray", "@SenBillNelson", "@DrRandPaul", "@sendavidperdue", "@SenGaryPeters", "@senrobportman", "@SenJackReed", "@SenatorRisch", "@PatRoberts",
    "@SenatorRounds", "@marcorubio", "@SenSanders", "@SenSasse", "@SenBrianSchatz", "@SenSchumer‏", "@SenatorTimScott", "@SenatorShaheen", "@SenShelby", "@TinaSmithMN", "@SenStabenow", "@SenDanSullivan", "@SenatorTester", "@SenJohnThune", "@SenThomTillis", "@SenToomey", "@SenatorTomUdall",
    "@ChrisVanHollen", "@MarkWarner", "@SenWarren‏", "@SenWhitehouse‏", "@SenatorWicker", "@RonWyden", "@SenToddYoung"
];

for (i = 0; i < cabinet.length; i++) {
    var newOption = $("<option>").addClass("options")
    newOption.append(cabinetNames[i]);
    newOption.attr("data-name", cabinetNames[i]);
    newOption.attr("data-twitter", twit[i]);
    $("#mySelect").append(newOption);
}
$("#myButton").on("click", function () {
    //show hidden divs
    $("#displayTweets").attr("style", "display: inline;");
    $("#displayAnalysis").attr("style", "display: inline;");
    $("#displayArticles").attr("style", "display: inline;");

    //Removes previous information from both 
    $("#displayTweets").empty();
    $("#displayArticles").empty();
    //Takes the text from the text box and applies it to search
    userName = $(".options:selected").attr("data-twitter");
    politician = $(".options:selected").attr("data-name");
    var newTweets = $("<a>").addClass("twitter-timeline").attr({ "href": "https://twitter.com/" + userName + "?ref_src=twsrc%5Etfw", "data-tweet-limit": 5, "height": 200, "width": 400 });
    var newScript = $("<script async src=" + "https://platform.twitter.com/widgets.js" + "?charset=utf-8>" + "/script>")
    var tweetAuthor = $("<h3> Tweets by " + politician + "</h3>");
    $("#displayTweets").append(newTweets).append(newScript).prepend(tweetAuthor);
    headlines();
    $("#handle").append(userName[i]);
});
$("#displayAnalysis").on("click", ".searchKeyword", function () {
    $("#displayArticles").empty();
    searchterm = $(this).attr("data-button");
    $("#displayArticles").html("<h3>" + searchterm + " in the news" + "</h3>" + "<br>");
    var queryGuardianURL = "https://content.guardianapis.com/search?page-size=5&order-by=newest&q=%22" + searchterm + "%22&api-key=152a7745-630a-46f3-8a3e-b776a965e1e8";
    $.ajax({
        url: queryGuardianURL,
        method: "GET"
    }).then(function (data) {
        //Array that returns the first 5 results
        var GuardianArticles = [data.response.results[0], data.response.results[1], data.response.results[2], data.response.results[3], data.response.results[4],]
        //For loop that adds each result to the page dynamically
        for (var i = 0; i < GuardianArticles.length; i++) {
            var article = data.response.results[i];
            var $articleList = $("<ul>");
            $articleList.addClass("list-group");
            $("#displayArticles").append($articleList);
            var source = "<h5> From the Guardian: </h5>";
            var headline = article.webTitle;
            var $articleListItem = $("<li class='list-group-item articleHeadline'>");
            $articleListItem.append("<a href='" + article.webUrl + "'>" + "<strong> " + headline + "</strong>" + "</a>");
            $articleList.append(source, $articleListItem);
        }
    })
    var queryNYTURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=2ad99af66aeb468e98d92f03183511e6&q=" + searchterm;
    $.ajax({
        url: queryNYTURL,
        method: "GET"
    }).then(function (data) {
        var NYTArticles = [data.response.docs[0], data.response.docs[1], data.response.docs[2], data.response.docs[3], data.response.docs[4],]
        for (var j = 0; j < NYTArticles.length; j++) {
            var Timesarticle = data.response.docs[j];
            var $articleList = $("<ul>");
            $articleList.addClass("list-group");
            $("#displayArticles").append($articleList);
            var NYTsource = "<h5> From the New York Times: </h5>";
            var NYTheadline = Timesarticle.headline.main;
            var $articleListItem = $("<li class='list-group-item articleHeadline'>");
            $articleListItem.append("<a href='" + Timesarticle.web_url + "'>" + "<strong> " + NYTheadline + "</strong>" + "</a>");
            $articleList.append(NYTsource, $articleListItem);
        }
    });
})





