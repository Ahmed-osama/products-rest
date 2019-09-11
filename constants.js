module.exports.DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@products-rest-db-9kdlj.mongodb.net/test?retryWrites=true&w=majority`
module.exports.EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
