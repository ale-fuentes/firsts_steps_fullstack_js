import app from './app'

const port = parseInt(`${process.env.PORT}`)

app.listen(port, () => {
    console.log(`listing in port ${port} ... OK !`);
});