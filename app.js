import Express from 'express';

const app = Express();

app.use(Express.json({ limit: "16kb"}));
app.use(Express.urlencoded({ extended: true, limit: "16kb"}));

export { app };