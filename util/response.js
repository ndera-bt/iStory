class Response {
  static success(message, statusCode, data, res) {
    return res.status(statusCode).json({
      status: true,
      statusCode,
      message,
      data,
    });
  }

  static successWithToken(message, statusCode, data, token, res) {
    return res.status(statusCode).json({
      status: true,
      statusCode,
      message,
      data,
      token,
    });
  }

  static error(message, statusCode, res) {
    return res.status(statusCode).json({ status: false, statusCode, message });
  }
}

module.exports = Response;
