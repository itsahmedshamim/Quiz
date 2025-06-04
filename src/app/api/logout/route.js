// src/app/api/logout/route.js

export async function POST(request) {
  // Expire the auth cookie immediately
  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        'Set-Cookie': `auth=; HttpOnly; Path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        'Content-Type': 'application/json',
      },
    }
  );
}
