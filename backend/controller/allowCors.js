// allowCors.js
const allowCors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.headers.origin) {
    console.log(req.headers.origin);
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://cryptomineapp.vercel.app"
    );
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, POST, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

export default allowCors;
