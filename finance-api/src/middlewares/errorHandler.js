// Deals with error of the whole system
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.name || "Internal Server Error",
    message: err.message || "Something went wrong with the server",
  });
};
