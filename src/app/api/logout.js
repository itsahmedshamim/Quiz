export default async function handler(req, res) {
  // Clear authentication cookie
  res.setHeader('Set-Cookie', 'auth=; HttpOnly; Path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  res.status(200).json({ success: true });
}