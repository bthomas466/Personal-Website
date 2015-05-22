var Profile = require("./profile.js");

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
    //if url == "/" && GET
    if(request.url === "/"){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("Header\n");
        response.write("Content\n");
        response.end("Footer");
    }
}

//Handle HTTP route GET /:username i.e. /brandonthomas2
function user(request, response) {
    var username = request.url.replace("/", "");
    if(username.length > 0) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("Header\n");
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
            response.write(values.username + " has " + values.badges + " badges\n");
            response.end("Footer");
        });
        //on "error"
        studentProfile.on("error", function(error){
            //show error
            response.write(error.message + "\n")
            response.end("Footer");
        });
    }
}

module.exports.home = home;
module.exports.user = user;
