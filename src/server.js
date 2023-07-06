import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from './bookController';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

const logger = morgan('dev');

app.use(logger);
app.use(express.json());

app.post('/books', createBook);
app.get('/books', getBooks);
app.get('/books/:id', getBookById);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Successfully connected to mongodb 📚'))
  .catch((e) => console.error(e));

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
