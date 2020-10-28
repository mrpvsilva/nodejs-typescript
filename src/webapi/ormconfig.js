const dotenv = require('dotenv')
dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '',
})

const {
    TYPEORM_CONNECTION,
    TYPEORM_HOST,
    TYPEORM_PORT,
    TYPEORM_USERNAME,
    TYPEORM_PASSWORD,
    TYPEORM_DATABASE,
    TYPEORM_AUTO_SCHEMA_SYNC,
    TYPEORM_ENTITIES,
    TYPEORM_MIGRATIONS,
    TYPEORM_ENTITIES_DIR,
    TYPEORM_MIGRATIONS_DIR,
    TYPEORM_LOGGING,
} = process.env

module.exports = {
    type: TYPEORM_CONNECTION || 'mysql',
    host: TYPEORM_HOST,
    port: TYPEORM_PORT,
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
    entities: [TYPEORM_ENTITIES],
    migrations: [TYPEORM_MIGRATIONS],
    logging: TYPEORM_LOGGING,
    synchronize: TYPEORM_AUTO_SCHEMA_SYNC,
    cli: {
        migrationsDir: TYPEORM_MIGRATIONS_DIR,
        entitiesDir: TYPEORM_ENTITIES_DIR
    }
}