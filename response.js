const response = (status, data, message, res) => {
  res.status(status).json({status,data,message,});
};

module.exports = response;
