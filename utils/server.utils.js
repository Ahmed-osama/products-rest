/**
 * set sucess state and passes result as json
 * @param {Object} response 
 * @param {Object} result 
 * @param {Number} status 
 */
const onSucess = (response, result, status = 200) => {
    response.status(status).json(result)
}

/**
 * set Error state and passes result as json
 * @param {Object} response 
 * @param {Object} result 
 * @param {Number} status 
 */
const onError = (response, error, status = 500) => {
    response.status(status).json({ error })
}

module.exports = {
    onSucess,
    onError
}