function userInformationHTML(user) {    // displays information that is called from api int html.
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar"> 
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" width="80" height ="80" alt="${user.login}" />
            </a>
        </div> 
        <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
}

function repoInformationHTML(repos) {
    console.log("repo function is called");
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    var listItemsHTML = repos.map(function(repo) {
        console.log("repos.map is called");
        return `
        <li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>`;
    });

    return `<div class="clearfix repo-list">
        <p>
            <strong>Repo List:</strong>
        </p>
        <ul>
            ${listItemsHTML.join("\n")}
        </ul>
    </div>`;
}

function fetchGitHubInformation(event) {    // retrieves information from api and stores into variables.

    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html("<h2>Please enter a GitHub username</h2>");
        return;
    }
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loading.gif" alt="loading..." />
        </div>`
    );

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData)); 
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, 
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}




function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var xhr = createCORSRequest('GET', url);
if (!xhr) {
  throw new Error('CORS not supported');
}