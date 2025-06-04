import { MongoClient, ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const data = await request.json();
    
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db('confidence-archetype');
    const collection = database.collection('results');
    
    // Add current date and convert to ISO string
    const document = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    
    const result = await collection.insertOne(document);
    await client.close();
    
    // Return string version of ObjectId
    return new Response(JSON.stringify({
      success: true,
      insertedId: result.insertedId.toString()  // Convert to string
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

