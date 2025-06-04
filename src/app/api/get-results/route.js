// src/app/api/get-results/route.js

import { MongoClient } from 'mongodb';

function unauthorizedResponse() {
  return new Response(null, {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(request) {
  // 1) Verify auth cookie
  const cookieHeader = request.headers.get('cookie') || '';
  if (!cookieHeader.split('; ').includes('auth=valid_token')) {
    return unauthorizedResponse();
  }

  // 2) Authenticated → fetch from MongoDB
  try {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('confidence-archetype');
    const collection = db.collection('results');

    const allResults = await collection.find({}).sort({ createdAt: -1 }).toArray();
    await client.close();

    return new Response(
      JSON.stringify({ success: true, results: allResults }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('GET /api/get-results error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
