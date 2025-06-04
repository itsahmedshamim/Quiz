// src/app/api/delete-result/route.js

import { MongoClient, ObjectId } from 'mongodb';

function unauthorizedResponse() {
  return new Response(null, {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  // 1) Verify auth cookie
  const cookieHeader = request.headers.get('cookie') || '';
  if (!cookieHeader.split('; ').includes('auth=valid_token')) {
    return unauthorizedResponse();
  }

  // 2) Authenticated → delete from MongoDB
  try {
    const { id } = await request.json();
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('confidence-archetype');
    const collection = db.collection('results');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    await client.close();

    return new Response(
      JSON.stringify({
        success: result.deletedCount === 1,
        deletedCount: result.deletedCount,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('POST /api/delete-result error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
