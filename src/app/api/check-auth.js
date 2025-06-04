export default async function handler(req, res) {
  // Check session (using your session management system)
  const isAuthenticated = req.cookies.auth === 'valid_token';
  res.status(200).json({ isAuthenticated });
}