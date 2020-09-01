import dotenv from "dotenv";
import express from 'express';
import bookRoutes from './routes/book.route';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT ?
  process.env.SERVER_PORT : 3000;

app.use(express.json());
app.use(bookRoutes);

app.listen(port, () => {
  console.log( `server started at http://localhost:${ port }` );
});

