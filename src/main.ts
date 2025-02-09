import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import {initializeFirebaseApp} from "./db.js";
import router from './routes/cafeRouter.js'

const HOST = 'localhost';
const PORT = 7007;
const app = express();
app.use(cors());
app.use(fileUpload({}));
app.use(express.json());
app.use('/api', router);
app.use(bodyParser.json());
initializeFirebaseApp();

const start = async () => {
try{
    app.listen(PORT, HOST, () => {console.log(`Server started at port ${PORT}`)});
}catch (e){
    console.log(e);
}
}

start();