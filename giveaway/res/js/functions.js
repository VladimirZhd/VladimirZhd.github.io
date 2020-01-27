function getVideoById() {
    let videoLink = document.getElementById("videoId").value;

    let eq = "=";
    let linkParts = videoLink.split(eq);
    let videoId = linkParts[1];

    // console.log(videoId);
    return videoId
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyDz_RiQwof-p1bvFK2eBUJIuLa-FgQ5kbI");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

function getComments() {
    let videoId = getVideoById();
    return gapi.client.youtube.commentThreads.list({
            "part": "snippet, replies",
            "videoId": videoId,
            "maxResults": 100
        })
        .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
            },
            function (err) {
                console.error("Execute error", err);
            });
}
gapi.load("client");