import { ObjectId } from 'mongodb';
import { algorithm } from '../algorithm.js';
import { getDatabase } from '../db.js';

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
  }

  return botResponse;
}

export async function saveMessageToDb(msg, sender, chatId) {
  const newMsg = { msg, sender, chatId: new ObjectId(chatId) };
  try {
    const db = getDatabase();
    const result = await db.collection('messages').insertOne(newMsg);
    newMsg._id = result.insertedId;
    if (sender === 'bot') {
      await db.collection('chats').updateOne({ _id: new ObjectId(chatId) }, { $set: { lastMsg: msg } });
    }
    return newMsg;
  } catch (err) {
    console.error('Error saving message to database:', err);
    throw new Error('Error saving message to database');
  }
}
