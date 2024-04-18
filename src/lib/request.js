const buildOptions = (data) => {
    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }

    const tableId = localStorage.getItem('tableId');
    const objectId = localStorage.getItem('restaurantId');
    if (tableId && objectId) {
        options.headers = {
            ...options.headers,
            tableId,
            objectId,
        };
    }


    return options;
};

const request = async (method, url, data) => {
    const response = await fetch(url, {
        ...buildOptions(data),
        method,
    });

    if (response.status === 204) {
        return {};
    }
    const result = await response.json();
    if (!response.ok) {
        throw result;
    }
    return result;
};

export const get = (url) => request('GET', url, null);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) => request('PUT', url, data);
export const remove = (url) => request('DELETE', url, null);
export const patch = (url, data) => request('PATCH', url, data);