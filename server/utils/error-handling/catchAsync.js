module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((e) => {
      console.log(e);
      res.status(500).json({
        status: "Failed",
        message: "Unknown server error",
        data: { error: e },
      });
      next();
    });
  };
};
