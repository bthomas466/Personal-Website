var Profile = require("./profile.js");
var renderer = require("./renderer.js");

var commonHeaders = {'Content-Type': 'text/html'};

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
    //if url == "/" && GET
    if(request.url === "/"){
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);
        renderer.view("index", {}, response);
        renderer.view("footer", {}, response);
        response.end();
    }
}

//Handle HTTP route GET /:username i.e. /brandonthomas2
function user(request, response) {
    var username = request.url.replace("/", "");
    if(username.length > 0) {
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);
        //get json from treehouse
        var studentProfile = new Profile(username);
        //on "end"
        studentProfile.on("end", function(profileJSON) {
            //show profile

            //Store the values which we need
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }
            //Simple response
            renderer.view("index", values, response);
            renderer.view("footer", {}, response);
            response.end();
        });
        //on "error"
        studentProfile.on("error", function(error){
            //show error
            renderer.view("error", {errorMessage: error.message}, response)
            renderer.view("footer", {}, response);
            response.end();
        });
    }
}

module.exports.home = home;
module.exports.user = user;
