// Virtual authentication status endpoint for API Gateway

function getCookie(request, cookie_name) {
    if (!("Cookie" in request.Headers)) {
	    return undefined;
    }
    var splitCookie = request.Headers["Cookie"][0].split("; ");
    var valueCookie = _.find(splitCookie, function(cookie) {
        if (cookie.indexOf(cookie_name+"=") > -1) {
            return cookie
        }
    });

    return valueCookie
}

function sessionHandler(request, session, spec) {
    log("Getting session info")

    var tokenCookie = getCookie(request, "session_id")
    var idToken = tokenCookie.split("=")[1];
    var status = b64dec(idToken.split('.')[1])
    
    responseObject = {
        Body: status,
        Headers: {
            "content-type": "application/json"
        },
        Code: 200
    }

    return TykJsResponse(responseObject, session.meta_data)
}

log("Virtual status endpoint initialised")