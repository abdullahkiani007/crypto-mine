const allowCors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Allow requests from specific origins
  const allowedOrigins = [
    process.env.FRONTEND_URI,
    "https://cryptomineapp.vercel.app",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
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
