import { ObjectId } from 'mongodb';
import { algorithm } from '../algorithm.js';
import { getDatabase } from '../db.js';

// Generate static response from an array of possibilities, simulating the AI algorithm
export function generateBotResponse(msg) {
  let botResponse = algorithm.general;

  switch (true) {
    case msg.toLowerCase().includes('hello'):
      botResponse = algorithm.hello;
      break;
    case msg.toLowerCase().includes('weather'):
      botResponse = algorithm.weather;
      break;
    case msg.toLowerCase().includes('news'):
      botResponse = algorithm.news;
      break;
    case msg.toLowerCase().includes('joke'):
      botResponse = algorithm.joke;
      break;
    case msg.toLowerCase().includes('goodbye'):
      botResponse = algorithm.goodbye;
      break;
    case msg.toLowerCase().includes('help'):
      botResponse = algorithm.help;
      break;
    default:
      botResponse = algorithm.general;
  }

  return botResponse;
}

// Database insertion of messages on the messages collection
export async function saveMessageToDb(msg, sender, chatId) {
  const newMsg = { msg, sender, chatId: new ObjectId(chatId) };
  try {
    const db = getDatabase();
    const result = await db.collection('messages').insertOne(newMsg);
    newMsg._id = result.insertedId;

    // The last message will always be from the algorithm, because it answers everything :D
    if (sender === 'bot') {
      // This will update the chats last message
      await db.collection('chats').updateOne({ _id: new ObjectId(chatId) }, { $set: { lastMsg: msg } });
    }
    return newMsg;
  } catch (err) {
    console.error('Error saving message to database:', err);
    throw new Error('Error saving message to database');
  }
}
