import { getCookie } from '../util/cookies.js'
import { getAccessToken, login, renew } from '@/auth/oidc'

// TODO: use vue style configuration
var configuration = {
    baseUrl: import.meta.env.VITE_API_URL,
    apiUrl: '/api'
}

var resource = {
    async get(resource) {
        return await this.fetch(resource, "GET", null);
    },
    async post(resource, body) {
        return await this.fetch(resource, "POST", body);
    },
    async put(resource, body) {
        return await this.fetch(resource, "PUT", body);
    },
    async delete(resource) {
        return await this.fetch(resource, "DELETE", null);
    },
    async fetch(resource, method, body) {
        
        var headers = this.headers(body)

        const token = await getAccessToken()
        if (token !== null) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (method != "GET") {
            // try to get laravel csrf token from cookie and add to reqeust header
            var csrfToken = getCookie('XSRF-TOKEN');
                
            if (csrfToken) {
                headers["X-XSRF-TOKEN"] = csrfToken;
            }
        }

        try {

            let response = await fetch(configuration.baseUrl + configuration.apiUrl + resource, {
                "headers": headers,
                "method": method,
                "body": ((body == null) ? null : JSON.stringify(body)),
                "mode": "cors",
                "credentials": "include"
            });

            // TOOD: use refresh token
            if (response.status === 401) {
                if (response.status === 401) {
                    login(window.location.pathname + window.location.search)
                }
            }

            const contentType = response.headers.get("content-type");
            
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json()
            } else {
                return response.text()
            }

        } catch (e) {
            notificationHelper.danger("Can't connect to backend");
        }
    },
    headers(body) {
        if (body) {
            return {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        } else {
            return {
                "Accept": "application/json"
            }
        }
    }
};


export default resource;