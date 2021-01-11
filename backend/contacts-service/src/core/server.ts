import app from './app'
import database from 'ms-commons/data/db'

(async () => {

    try {
        const port = parseInt(`${process.env.PORT}`)

        await database.sync();
        console.log(`DataBase are listing ... OK !`);

        await app.listen(port);
        console.log(`Server are listing in port ${port} ... OK !`);

    } catch (error) {
        console.log(`ERROR when try start Server : ${error} `);

    }
})()