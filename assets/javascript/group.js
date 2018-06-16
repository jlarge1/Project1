 //Create empty variable for user to be filled in after text is entered 
 var userName = "";
 var politician = "";
 //function that accesses the NYT and Guardian API's and adds 5 headlines/URLs to screen
 function headlines() {
     console.log("What's going on here");
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
             $articleListItem.append("<a href='" + article.webUrl + "'>" + article.webUrl + "</a>");
             $articleList.append(source, "<strong> " + headline + "</strong>", $articleListItem);
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
             $articleListItem.append("<a href='" + Timesarticle.web_url + "'>" + Timesarticle.web_url + "</a>");
             $articleList.append(NYTsource, "<strong> " + NYTheadline + "</strong>", $articleListItem);
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
     "Donald Trump", "Mike Pence", "Jeff Sessions", "Scott Pruitt", "Linda McMahon", "Dan Coats", "Gina Haspel", "Mick Mulvaney", "Nikki Haley", "Sonny Perdue", "Wilbur Ross",
     "James Mattis", "Betsy DeVos", "Rick Perry", "Alex Azar", "Kirstjen Nielsen", "Ben Carson", "Ryan Zinke", "Alex Acosta", "Mike Pompeo", "Elaine Chao", "Steven Mnuchin", "Robert Lighthizer", "John Kelly",
     "Lamar Alexander ", "Tammy Baldwin", "John Barrasso", "Michael Bennet", "Richard Blumenthal", "Roy Blunt", "Cory Booker", "John Boozman", "Sherrod Brown", "Richard Burr", "Maria Cantwell", "Shelley Moore Capito", "Ben Cardin", "Tom Carper",
     "Bob Casey", "Bill Cassidy", "Susan Collins", "Chris Coons", "Bob Corker", "John Cornyn", "Catherine Cortez Masto", "Tom Cotton", "Mike Crapo", "Ted Cruz", "Steve Daines", "Joe Donnelly", "Tammy Duckworth", "Dick Durbin", "Mike Enzi",
     "Joni Ernst", "Dianne Feinstein", "Deb Fischer", "Jeff Flake", "Cory Gardner", "Kirsten Gillibrand", "Lindsey Graham", "Chuck Grassley", "Kamala Harris", "Maggie Hassan", "Orrin Hatch", "Martin Heinrich", "Heidi Heitkamp", "Dean Heller", "Mazie Hirono",
     "John Hoeven", "Cindy Hyde-Smith", "Jim Inhofe", "Johnny Isakson", "Ron Johnson", "Tim Kaine", "John Kennedy", "Angus King", "Doug Jones", "Amy Klobuchar", "James Lankford", "Patrick Leahy", "Mike Lee", "Joe Manchin", "Ed Markey", "John McCain",
     "Claire McCaskill", "Mitch McConnell", "Bob Menendez", "Jeff Merkley", "Jerry Moran", "Lisa Murkowski", "Chris Murphy", "Patty Murray", "Bill Nelson", "Rand Paul", "David Perdue", "Gary Peters", "Rob Portman", "Jack Reed", "Jim Risch", "Pat Roberts",
     "Mike Rounds", "Marco Rubio", "Bernie Sanders", "Ben Sasse", "Brian Schatz", "Chuck Schumer", "Tim Scott", "Jeanne Shaheen", "Richard Shelby", "Tina Smith", "Debbie Stabenow", "Dan Sullivan", "Jon Tester", "John Thune", "Thom Tillis", "Pat Toomey", "Tom Udall",
     "Chris Van Hollen", "Mark Warner", "Elizabeth Warren", "Sheldon Whitehouse", "Roger Wicker", "Ron Wyden", "Todd Young"
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
 var position = [
     "POTUS", "Vice President", "Attoney General", "Administrator of EPA", "Administartor of SBA", "Director National Intelligence", "Director Central Intelligence Agency", "Director of Budget Office", "Rep United Nation", "Secretary of Agriculture", "Secretary of Commerce",
     "Secretary of Defense", "Secretary of Education",
 ];

 for (i = 0; i < cabinet.length; i++) {
     var newOption = $("<option>").addClass("options")
     newOption.append(cabinet[i]);
     newOption.attr("data-name", cabinetNames[i]);
     newOption.attr("data-twitter", twit[i]);
     $("#mySelect").append(newOption);
 }
 $("#myButton").on("click", function () {
     //Removes previous information from both columns
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




 