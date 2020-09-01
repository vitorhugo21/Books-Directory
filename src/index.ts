import cors from 'cors';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import bookRoutes from './routes/book.route';

const swaggerDocumentPath = path.join(__dirname, 'data', 'swagger.yaml');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load(swaggerDocumentPath)));
app.use(bookRoutes);

app.listen(port, () => {
  console.log( `server started at http://localhost:${ port }` );
});

