import express from "express";
import productsRouter from "./routes/products.js";

const app = express();



// Middleware для логирования запросов
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Middleware для обработки JSON
app.use(express.json());

// Главная страница
app.get("/", (req, res) => {
  res.send("Привет Express!");
});

app.use("/products", productsRouter);

// Middleware блокировки административного раздела
app.use("/admin", (req, res, next) => {
  res.status(403).send("Доступ запрещён");
});

// Административный маршрут
app.get("/admin", (req, res) => {
  res.send("Панель администратора");
});

// Запуск сервера
app.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000");
});
