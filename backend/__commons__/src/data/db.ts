import { Sequelize } from 'sequelize';

const db = {
    db_name: process.env.DB_NAME!,
    db_user: process.env.DB_USER!,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_logging: process.env.SQL_LOG ? true : false
}

// console.log('INFO: const db', db);

const sequelize = new Sequelize(db.db_name, db.db_user, db.db_password, {
    dialect: 'mysql',
    host: db.db_host,
    logging: db.db_logging
})

export default sequelize