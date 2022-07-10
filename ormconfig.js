require("dotenv").config();

module.exports = {
    "username": process.env.TYPEORM_USER,
    "password": process.env.TYPEORM_PASSWORD,
    "host": process.env.TYPEORM_HOST,
    "type": process.env.TYPEORM_DATABASE_TYPE,
    "port": process.env.TYPEORM_PORT,
    "database": process.env.TYPEORM_DATABASE_NAME,
    "synchronize": true,
    "entities": [
        'dist/modules/**/entities/*.entity{.ts,.js}'
    ],
    "migrationRun": 'true',
    "migrations": [
        `${process.env.TYPEORM_MIGRATIONS_DIR}`
    ],
    "cli": {
        "migrationsDir": "src/config/database/migration",
        "subscribersDir": "src/subscriber"
    },
    seeds: ['src/config/database/seeds/**/*{.ts,.js}'],
    factories: ['src/config/database/factories/**/*{.ts,.js}'],
}
