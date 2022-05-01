import {createConnection} from "mysql2";
import {DATABASE_COLOR, RESET_COLOR} from "../../../config";

export default async function connectToMySQL() {
    /* If MySQL is enabled */
    if (process.env.MYSQL_ENABLED === 'true') {
        /* Create the connection */
        global.mysql = createConnection({
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        })
        /* Log the connection */
        console.info(DATABASE_COLOR + `[INFO] Connected to MySQL ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT} with user ${process.env.MYSQL_USER}` + RESET_COLOR)
    }
}