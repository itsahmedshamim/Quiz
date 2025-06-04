export default async function handler(req, res) {
  const { username, password } = req.body;
  const envUser = process.env.DASHBOARD_USER;
  const envPass = process.env.DASHBOARD_PASS;

  if (username === envUser && password === envPass) {
    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', 'auth=valid_token; HttpOnly; Path=/; SameSite=Strict; Secure');
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
}