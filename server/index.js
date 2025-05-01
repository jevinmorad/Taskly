const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});