import { Pool } from 'pg';

console.log({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST, 
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT)
})

const db = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST, 
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT)
})

export default db;
