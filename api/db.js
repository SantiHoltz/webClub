import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgresql://neondb_owner:npg_KHyCg9QNJbp8@ep-misty-hill-ac9gzlxq-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { dialect: 'postgres', ssl: {
    require: true,
    rejectUnauthorized: false,
  }, })

export default sequelize;
