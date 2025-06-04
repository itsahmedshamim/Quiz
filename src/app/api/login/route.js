// src/app/api/login/route.js

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const envUser = process.env.DASHBOARD_USER;
    const envPass = process.env.DASHBOARD_PASS;

    if (username === envUser && password === envPass) {
      // Set HTTP‐only cookie named "auth"
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: {
            'Set-Cookie': `auth=valid_token; HttpOnly; Path=/; SameSite=Strict; Secure`,
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (err) {
    console.error('API /api/login error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
