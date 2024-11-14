import { Add } from '@mui/icons-material';
import { chatInitialValue } from '../../../constants/constants';
import { ChatListItem } from '../chat-list-item/chat-list-item';
import { Chat } from '../main.content';
import classes from './styles.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ChatListProps {
  selectedChat: Chat;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat>>;
  needUpdateChats: boolean;
  setNeedUpdateChats: React.Dispatch<React.SetStateAction<boolean>>;
}

// Since this is a simple project,
// there is no concern about handling
// skip and limit of the backend requests

export const ChatList = (props: ChatListProps) => {
  const { selectedChat, setSelectedChat, needUpdateChats, setNeedUpdateChats } = props;

  const [chats, setChats] = useState<Chat[]>([]); // List of chats

  // Hook that fetches all chats when the component is rendered and each time the needUpdateChats variable is true
  useEffect(() => {
    if (needUpdateChats) {
      fetchChats();
      setNeedUpdateChats(false);
    }
  }, [needUpdateChats, setNeedUpdateChats]);

  // Request that fetches all chats available
  const fetchChats = async () => {
    await axios.get('http://localhost:4000/chats').then((res) => {
      const fetchedChats: Chat[] = res.data;
      setChats(fetchedChats);
    });
  };

  // Post Request to create a new chat with default values
  const createNewChat = async () => {
    try {
      const newChatData = { name: 'New chat', lastMsg: '' };
      const resp = await axios.post('http://localhost:4000/chats', newChatData);

      // Add the newly created chat to the chat list
      setChats((prevChats) => [...prevChats, resp.data]);

      // Select the new chat
      setSelectedChat(resp.data);
    } catch (err) {
      console.error('Error creating chat: ', err);
    }
  };

  return (
    <div className={classes.chatListMainDiv}>
      <button className={classes.newChatBtn} onClick={createNewChat}>
        <Add fontSize='small' color='inherit' />
        New chat
      </button>
      <div className={classes.chatListItemDiv}>
        {chats.map((chat) => {
          return (
            <div
              key={chat._id}
              onClick={() =>
                selectedChat._id === chat._id ? setSelectedChat(chatInitialValue) : setSelectedChat(chat)
              }
              className={classes.parentItemDiv}
            >
              <ChatListItem chat={chat} selected={selectedChat._id === chat._id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
