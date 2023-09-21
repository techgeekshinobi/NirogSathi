const express = require('express');
const cors = require('cors');
const routes = require('./router/routes');
const sqlconn = require('./database/database');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
PORT = process.env.PORT;

const app = express();
app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ limit: '8mb', extended: true }));
app.use(cors({
    origin: "*"
}));

sqlconn.connect(()=>{
    console.log('Database Connected');
});

app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})