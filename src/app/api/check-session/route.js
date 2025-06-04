// src/app/api/check-session/route.js

export async function GET(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const isAuthenticated = cookieHeader
    .split('; ')
    .includes('auth=valid_token');

  return new Response(
    JSON.stringify({ isAuthenticated }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
