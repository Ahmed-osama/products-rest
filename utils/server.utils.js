const onSucess = (response, result, status = 200) => {
    response.status(status).json(result)
}
const onError = (response, error, status = 500) => {
    response.status(status).json({ error })
}

module.exports = {
    onSucess,
    onError
}