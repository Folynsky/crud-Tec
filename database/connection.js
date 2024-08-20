<<<<<<< HEAD
import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    allowExitOnIdle: true,
});

(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Base de datos conectada:', result.rows[0].now);
    } catch (error) {
        console.error('Error:', error);
    }
=======
import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    allowExitOnIdle: true,
});

(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Base de datos conectada:', result.rows[0].now);
    } catch (error) {
        console.error('Error:', error);
    }
>>>>>>> 5ca886a021df8e204dcdea12f8e3bd0e12d36b71
})();