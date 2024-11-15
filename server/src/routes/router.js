import express from 'express';
import { getDatabase } from '../db.js';
import { ObjectId } from 'mongodb';
import { saveMessageToDb, generateBotResponse } from '../func/helper-functions.js';

const router = express.Router();

// Get endpoint that fetches all chats
router.get('/chats', async (req, res) => {
  try {
    const database = getDatabase();
    const chats = await database.collection('chats').find({}).toArray();
    res.send(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).send('Error fetching chats');
  }
});

// Get endpoint that finds messages from a specific chat
router.get('/:id/messages', async (req, res) => {
  try {
    const chatId = req.params.id.toLowerCase();
    const database = getDatabase();
    const messages = await database
      .collection('messages')
      .find({ chatId: new ObjectId(chatId) })
      .toArray();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).send('Error fetching chats');
  }
});

// Post endpoint that creates new chats
router.post('/chats', async (req, res) => {
  const { name, lastMsg } = req.body;

  const newChat = { name, lastMsg };

  try {
    const db = getDatabase();
    const result = await db.collection('chats').insertOne(newChat);
    newChat._id = result.insertedId;
    res.status(201).json(newChat);
  } catch (err) {
    console.error('Error saving chat:', err);
    res.status(500).send('Error creating chat');
  }
});

// Post endpoint that adds new messages to database
router.post('/messages', async (req, res) => {
  const { msg, sender, chatId } = req.body;

  try {
    // Insert user message
    const newMsg = await saveMessageToDb(msg, sender, chatId);

    // Generate response based on the user message
    const botResponse = generateBotResponse(msg);

    // Insert algorithm message into the database
    const newBotMsg = await saveMessageToDb(botResponse, 'bot', chatId);

    res.status(201).json({ userMessage: newMsg, botResponse: newBotMsg });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).send('Error sending message');
  }
});

// Put endpoint to update the chat's name
router.put('/chats/:chatId', async (req, res) => {
  const { chatId } = req.params;
  const { newName } = req.body;

  try {
    const db = getDatabase();
    const result = await db.collection('chats').updateOne({ _id: new ObjectId(chatId) }, { $set: { name: newName } });

    if (result.matchedCount === 0) {
      return res.status(404).send('Chat not found');
    }

    res.status(200).send('Chat updated with success');
  } catch (err) {
    console.error('Error editing chat name:', err);
    res.status(500).send('Error editing chat name');
  }
});

// Delete endpoint that deletes a chat and associated messages on the messages collection
router.delete('/chats/:chatId', async (req, res) => {
  const { chatId } = req.params;

  try {
    const db = getDatabase();
    const result = await db.collection('chats').deleteOne({ _id: new ObjectId(chatId) });

    if (result.deletedCount > 0) {
      await db.collection('messages').deleteMany({ chatId: new ObjectId(chatId) });

      res.status(200).send('Chat deleted successfully');
    } else {
      res.status(404).send('Chat not found');
    }
  } catch (err) {
    console.error('Error deleting chat:', err);
    res.status(500).send('Error deleting chat');
  }
});

export default router;
