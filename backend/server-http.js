import http from "node:http";

const server = http.createServer( (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  const url = new URL(req.url, "http://localhost:3000");

  const products = [
    {id: 1, name: "Монитор Samsung", price: 15000},
    {id: 2, name: "Мышь Razer", price: 5000}
  ];

  

  if (req.method === "GET" && url.pathname === "/"){
    res.end("Добро пожаловать в ПокупОЧКУ");
    return;
  }

  if(req.method === "GET" && url.pathname === "/products"){
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(products));
    return;
  }

  if(req.method === "GET" && url.pathname.startsWith("/products/")){
    const parts = url.pathname.split("/");
    const productId = Number(parts[2]);

    if(!Number.isInteger(productId) ||  !(productId > 0)){
      res.statusCode = 400;
      res.end("Некорректный ID");
      return;
    }

    const product = products.find( p => p.id === productId);

    if(product === undefined){
      res.statusCode = 404;
      res.end("Товар не найден");
      return;
    }
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    res.end(JSON.stringify(product));
    return;
  }

  res.statusCode = 404;
  res.end("Страница не найдена!");
});

server.listen(3000);