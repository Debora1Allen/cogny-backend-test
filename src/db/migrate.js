const massive = require('massive');
const { DATABASE_SCHEMA, DATABASE_URL } = require('../../config');

(async () => {
    const db = await massive({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }, {
        scripts: process.cwd() + '/migration',
        allowedSchemas: [DATABASE_SCHEMA],
        whitelist: [`${DATABASE_SCHEMA}.%`],
    });

    await db.reload();
    console.log('Database migration completed.');
})();
