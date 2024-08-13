async function insertData(db, data) {
    return await db[DATABASE_SCHEMA].api_data.insert({
        doc_record: data,
    });
}

async function calculateTotalPopulation(db) {
    return await db.query(`
        SELECT SUM((doc_record->>'Population')::int) as total_population
        FROM ${DATABASE_SCHEMA}.api_data, jsonb_array_elements(doc_record) as doc_record
        WHERE (doc_record->>'ID Year')::int IN (2018, 2019, 2020)
    `);
}

module.exports = { insertData, calculateTotalPopulation };
