exports.Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = errorHandler(400, "Please provide username and password");
    return res.status(error.statusCode).json({ error: error.message });
  }

  // Simulate user login logic
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    const error = errorHandler(404, "User not found");
    return res.status(error.statusCode).json({ error: error.message });
  }

  res.json({ message: "User logged in successfully", user });
};
