const { default: Axios } = require("axios");
const axios = require('axios');

const {TIME_OUT } = process.env;

module.exports = (baseUrl) => {
    return axios.crete({
        baseUrl: baseUrl,
        timeout: TIME_OUT
    })
}