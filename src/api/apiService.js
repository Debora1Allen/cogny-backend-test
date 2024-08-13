const axios = require('axios');

async function fetchData() {
    const response = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
    return response.data.data;
}

module.exports = { fetchData };
