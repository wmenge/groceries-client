import resource from '../util/resource.js'

// TODO: Use typescript
function getAll() {
    return resource.get(`${this.endpoint}`);
};

function get(id) {
    return resource.get(`${this.endpoint}/${id}`);
};

function save(object) {
    return (this.id) ? resource.put(`${this.endpoint}/${grocery.id}`, object) : resource.post(`${this.endpoint}`, object);
}

function remove(object) {
    resource.delete(`${this.endpoint}/${object.id}`, object)
}

const groceryResource = {
    endpoint: '/groceries',
	getAll: getAll,
    get: get,
	save: save,
    remove: remove,
}

export { groceryResource };