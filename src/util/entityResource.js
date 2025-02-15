import resource from '../util/resource.js'
import queryString from '../util/queryString.js'

// TODO: Use typescript
function getAll(query) {
    return resource.get(`${this.endpoint}${queryString(query)}`);
};

function get(id) {
    return resource.get(`${this.endpoint}/${id}`);
};

function save(object) {
    return (object.id) ? resource.put(`${this.endpoint}/${object.id}`, object) : resource.post(`${this.endpoint}`, object);
}

function remove(object) {
    resource.delete(`${this.endpoint}/${object.id}`, object)
}

function getAllFromParent(parentId) {
    return resource.get(`${this.parentEndpoint}/${parentId}/${this.endpoint}`);
};

function getFromParent(parentId, id) {
    return resource.get(`${this.parentEndpoint}/${parentId}${this.endpoint}/${id}`);
};

function saveFromParent(parentId, object) {
    return (object.id) ? 
        resource.put(`${this.parentEndpoint}/${parentId}${this.endpoint}/${object.id}`, object) : 
        resource.post(`${this.parentEndpoint}/${parentId}${this.endpoint}`, object);
}

function removeFromParent(parentId, object) {
    resource.delete(`${this.parentEndpoint}/${parentId}${this.endpoint}/${object.id}`, object)
}

const groceryResource = {
    endpoint: '/groceries',
	getAll: getAll,
    get: get,
	save: save,
    remove: remove,
}

const shoppingListResource = {
    endpoint: '/shopping-lists',
	getAll: getAll,
    get: get,
	save: save,
    remove: remove,
}

const shoppingListEntriesResource = {
    parentEndpoint: shoppingListResource.endpoint,
    endpoint: `/entries`,
	getAll: getAllFromParent,
    get: getFromParent,
	save: saveFromParent,
    remove: removeFromParent,
}

export { groceryResource, shoppingListResource, shoppingListEntriesResource };