
/**
 * 
 * @param {Boolean} success The status of the request
 * @param {String} message The message from the server
 * @param {Object} data The actual data to send to the client
 * @returns new Object() { 
 *  success: boolean; 
 *  message: string;
 *  data: Object<[] | {}>
 *  }
 */
function ResponseContext(success, message = "", data = undefined) {
    return {
        success: success,
        message: message,
        data: data
    };
}

module.exports = ResponseContext;
