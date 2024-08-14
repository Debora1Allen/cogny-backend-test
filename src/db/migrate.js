const massive = require('massive');
const { DATABASE_SCHEMA, DATABASE_URL } = require('../config');

(async () => {
    const db = await massive({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }, {
        allowedSchemas: [DATABASE_SCHEMA],
        whitelist: [`${DATABASE_SCHEMA}.%`],
    });

    await db.reload();

    const data = await fetchData();
    await insertData(db, data);

    const totalPopulationSQL = await calculateTotalPopulation(db);
    console.log('Total population (SQL Query):', totalPopulationSQL[0].total_population);
})();

