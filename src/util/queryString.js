var queryString = function(query) {
    if (!query) return "";
    return '?' + Object.keys(query).map(k => k + '=' + query[k]).join('&');
}

export default queryString;