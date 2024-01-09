import db from "./pool"

const createTable = async () => {
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(255) PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);
    } catch (error) {
        throw error;
    }
}

export { createTable }
