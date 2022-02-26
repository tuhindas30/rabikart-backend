const userResponse = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

function HttpError(statusCode, message) {
  this.statusCode = statusCode;
  this.message = message;
}

module.exports = { userResponse, HttpError };
