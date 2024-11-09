import Express from 'express';
import router from './routes/index.js';

const app = Express();

app.use(Express.json({ limit: "16kb"}));
app.use(Express.urlencoded({ extended: true, limit: "16kb"}));

// Routes
app.use("/api", router);

export { app };