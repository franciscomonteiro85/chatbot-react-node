import { IconButton, TextField } from '@mui/material';
import { EmptyChatContent } from '../empty-chat/empty-chat-content';
import { Chat } from '../main.content';
import classes from './styles.module.css';
import { useCallback, useEffect, useState } from 'react';
import { Delete, Edit, Send } from '@mui/icons-material';
import { ChatMessage } from '../chat-message/chat-message';
import axios from 'axios';
import { EditNameDialog } from '../edit-name-dialog/edit-name-dialog';
import { chatInitialValue } from '../../../constants/constants';

interface ChatContentProps {
  selectedChat: Chat;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat>>;
  setNeedUpdateChats: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Message {
  _id: string;
  msg: string;
  sender: string;
  chatId: string;
}

export const ChatContent = (props: ChatContentProps) => {
  const { selectedChat, setSelectedChat, setNeedUpdateChats } = props;

  const [currentMessage, setCurrentMessage] = useState<string>(''); // Current text on the message input
  const [chatMessages, setChatMessages] = useState<Message[]>([]); // List of the current chat messages
  const [openEditNameDialog, setOpenEditNameDialog] = useState<boolean>(false); // Variable that toggles the dialog

  // Helper function that fetches all the current chat messages
  const fetchChatMessages = useCallback(async () => {
    await axios.get(`http://localhost:4000/${selectedChat._id}/messages`).then((res) => {
      const fetchedMsgs: Message[] = res.data;
      setChatMessages(fetchedMsgs);
    });
  }, [selectedChat._id]);

  // Fetch the messages each time the selected chat changes
  useEffect(() => {
    if (selectedChat._id) {
      // Verify if there is a selected chat
      fetchChatMessages();
    }
  }, [fetchChatMessages, selectedChat]);

  // Request to send message and receive the response from the algorithm
  const sendMessage = async () => {
    // Verify if the current message input is not empty
    if (currentMessage) {
      try {
        // Since we dont have accounts, we use Francisco to identify the user
        const newMsgData = { msg: currentMessage, sender: 'Francisco', chatId: selectedChat._id };
        const resp = await axios.post('http://localhost:4000/messages', newMsgData);

        // Update chat messages with both the sent and the received message
        setChatMessages((prevMsgs) => [...prevMsgs, resp.data.userMessage, resp.data.botResponse]);

        // Clean the message input
        setCurrentMessage('');

        // Make chat list update, because the last message of the current chat has changed
        setNeedUpdateChats(true);
      } catch (err) {
        console.error('Error sending message: ', err);
      }
    }
  };

  // Request to edit chat's name
  const editChatName = async (newName: string) => {
    setOpenEditNameDialog(false);

    try {
      const resp = await axios.put(`http://localhost:4000/chats/${selectedChat._id}`, { newName });

      // If ok, then update the selected chat's name and make chat list updates its chats, because the name has changed
      if (resp.status === 200) {
        setSelectedChat({ ...selectedChat, name: newName });
        setNeedUpdateChats(true);
      }
    } catch (error) {
      console.error('Error updating chat name:', error);
    }
  };

  // Request to delete chat and its messages
  const deleteChat = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/chats/${selectedChat._id}`);

      // If ok, then deselect the chat and make chat list update its elements
      if (response.status === 200) {
        setSelectedChat(chatInitialValue);
        setNeedUpdateChats(true);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  return (
    <>
      <div className={classes.chatContentMainDiv}>
        {selectedChat.name ? (
          <div className={classes.chatSelected}>
            <div className={classes.chatNameDiv}>
              <h3>{selectedChat.name}</h3>
              <IconButton onClick={() => setOpenEditNameDialog(true)} style={{ marginLeft: 'auto' }}>
                <Edit fontSize='small' className={classes.editIcon} />
              </IconButton>
              <IconButton onClick={deleteChat} style={{ marginLeft: '8px' }}>
                <Delete fontSize='small' className={classes.deleteIcon} />
              </IconButton>
            </div>
            <div className={classes.displayMsgs}>
              {chatMessages.map((msg) => {
                return <ChatMessage key={msg._id} sender={msg.sender === 'Francisco'} msg={msg.msg} />;
              })}
            </div>
            <div className={classes.sendMsg}>
              <div className={classes.sendMsgInput}>
                <TextField
                  label={'Send message'}
                  fullWidth
                  color='success'
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                />
              </div>
              <div onClick={sendMessage} className={classes.sendIcon}>
                <Send />
              </div>
            </div>
          </div>
        ) : (
          <EmptyChatContent />
        )}
      </div>
      {/* Opens the dialog to edit the chat name*/}
      {openEditNameDialog ? (
        <EditNameDialog
          open={openEditNameDialog}
          onClose={() => setOpenEditNameDialog(false)}
          onSubmit={editChatName}
          value={selectedChat.name}
        />
      ) : null}
    </>
  );
};
