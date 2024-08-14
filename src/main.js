const massive = require('massive');
const { DATABASE_SCHEMA, DATABASE_URL } = require('../config');
const { fetchData } = require('./api/apiService');
const { insertData, calculateTotalPopulation } = require('./db/dbService');

(async () => {
    const db = await massive({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }, {
        scripts: process.cwd() + '/migration',
        allowedSchemas: [DATABASE_SCHEMA],
    });

    const data = await fetchData();
    await insertData(db, data);

    const totalPopulationMemory = data
        .filter(item => [2020, 2019, 2018].includes(item['ID Year']))
        .reduce((sum, item) => sum + item.Population, 0);
    console.log('Total population (in-memory):', totalPopulationMemory);

    const totalPopulationSQL = await calculateTotalPopulation(db);
    console.log('Total population (SQL Query):', totalPopulationSQL[0].total_population);
})();
