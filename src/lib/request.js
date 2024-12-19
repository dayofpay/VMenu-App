/**
 * Builds options for a request based on the data provided.
 *
 * @param {object} data - The data to be sent with the request.
 * @returns {object} - An object containing the options for the request.
 */
const buildOptions = (data) => {
    const options = {};

    /**
     * If data is provided, it needs to be serialized and sent as the body of the request.
     * We also need to set the content-type header to application/json.
     */
    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }

    /**
     * If we have a tableId and objectId stored in localStorage, we need to set them as headers.
     * This is because we need to send this information with every request.
     */
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


/**
 * Makes a request to the specified URL with the specified method and data.
 *
 * @param {string} method - The method to use for the request.
 * @param {string} url - The URL to request.
 * @param {object} data - The data to be sent with the request.
 * @returns {Promise<object>} - A promise that resolves to the JSON data from the response.
 */
const request = async (method, url, data) => {
    /**
     * We first need to build the options for the request. This involves serializing the
     * data and setting the content-type header if data is provided. It also sets the
     * tableId and objectId headers if they are stored in localStorage.
     */
    const options = buildOptions(data);

    /**
     * Now we can make the request. We use the fetch API, passing in the URL, method, and
     * options. The fetch API returns a Promise that resolves to a Response object.
     */
    const response = await fetch(url, {
        ...options,
        method,
    });

    /**
     * If the response status is 204, that means the request was successful but there is
     * no content to return. In this case, we just return an empty object.
     */
    if (response.status === 204) {
        return {};
    }

    /**
     * Otherwise, we need to parse the response as JSON. The Response object has a
     * json() method that returns a Promise that resolves to the parsed JSON data.
     */
    const result = await response.json();

    /**
     * If the response was not OK, we need to throw an error. The error will contain the
     * parsed JSON data from the response.
     */
    if (!response.ok) {
        throw result;
    }

    /**
     * If the response was OK, we just return the parsed JSON data.
     */
    return result;
};

export const get = (url) => request('GET', url, null);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) => request('PUT', url, data);
export const remove = (url) => request('DELETE', url, null);
export const patch = (url, data) => request('PATCH', url, data);