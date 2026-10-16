import express from "express";
import { products } from "../data/products.js";

const router = express.Router();

let lastProductId = Math.max(0, ...products.map(p => p.id));

// Получение каталога и поиск товаров
router.get("/", (req, res) => {
  if (req.query.search === undefined) {
    return res.json(products);
  }

  if (typeof req.query.search !== "string") {
    return res.status(400).send("Неправильный запрос");
  }

  const qProduct = req.query.search.toLowerCase().trim();

  const fProduct = products.filter(p =>
    p.name.toLowerCase().includes(qProduct)
  );

  res.json(fProduct);
});

// Получение товара по ID
router.get("/:id", (req, res) => {
  const paramsId = Number(req.params.id);

  if (!Number.isInteger(paramsId) || paramsId <= 0) {
    return res.status(400).send("Некорректный ID");
  }

  const product = products.find(p => p.id === paramsId);

  if (product === undefined) {
    return res.status(404).send("Товар не найден!");
  }

  res.json(product);
});

// Создание нового товара
router.post("/", (req, res) => {
  console.log(req.body);

  const name = req.body?.name;
  const price = req.body?.price;

  // Проверка названия
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Некорректное название товара");
  }

  // Проверка цены
  if (!Number.isFinite(price) || price <= 0) {
    return res.status(400).send("Некорректная цена товара");
  }

  lastProductId += 1;

  const newProduct = {
    id: lastProductId,
    name: name.trim(),
    price
  };

  products.push(newProduct);

  console.log(products);

  return res.status(201).json(newProduct);
});

// Частичное обновление товара
router.patch("/:id", (req, res) => {
  const paramsId = Number(req.params.id);

  if (!Number.isInteger(paramsId) || paramsId <= 0) {
    return res.status(400).json("Некорректный ID!");
  }

  const thisProduct = products.find(p => p.id === paramsId);

  if (thisProduct === undefined) {
    return res.status(404).json("Такого товара не существует!");
  }

  const updatePrice = req.body?.price;
  const updateName = req.body?.name;

  // Проверка названия
  if (updateName !== undefined) {
    if (typeof updateName !== "string" || updateName.trim() === "") {
      return res.status(400).json("Некорректно введено название!");
    }
  }

  // Проверка цены
  if (updatePrice !== undefined) {
    if (!Number.isFinite(updatePrice) || updatePrice <= 0) {
      return res.status(400).json("Некорректно введена цена!");
    }
  }

  // Проверка наличия изменений
  if (updatePrice === undefined && updateName === undefined) {
    return res.status(400).json("Не указаны поля для обновления!");
  }

  // Изменение только переданных полей
  if (updatePrice !== undefined) {
    thisProduct.price = updatePrice;
  }

  if (updateName !== undefined) {
    thisProduct.name = updateName.trim();
  }

  return res.status(200).json(thisProduct);
});

router.delete("/:id", (req, res) => {
  const ID = Number(req.params.id);

  if(!Number.isInteger(ID) || ID <= 0){
    return res.status(400).json("Некорректный ID!");
  }

  const index = products.findIndex( p => p.id === ID);

  if (index === -1){
    return res.status(404).json("Товар с таким ID не найден!");
  }

  products.splice(index, 1);

  res.status(204).end();
});

router.put("/:id", (req, res) => {
  const ID = Number(req.params.id);

  if(!Number.isInteger(ID) || ID <= 0){
    return res.status(400).json("Некорректно введен ID");
  }

  const thisProduct = products.find( p => p.id === ID);

  if(thisProduct === undefined){
    return res.status(404).json("Товара с таким ID не существует!");
  }

  const newName = req.body?.name;
  const newPrice = req.body?.price;

  if (newName === undefined || newPrice === undefined){
    return res.status(400).json("Введены не все значения!");
  }

  if(typeof newName !== 'string' || newName.trim() === "" ){
    return res.status(400).json("Неправильно введено название товара!");
  }

  if(!Number.isFinite(newPrice) || newPrice <= 0){
    return res.status(400).json("Неправильно введена цена товара!");
  }

  thisProduct.name = newName.trim();
  thisProduct.price = newPrice;
  
  res.status(200).json(thisProduct);
});


export default router;