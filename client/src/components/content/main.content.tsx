import { ChatList } from './chat-list/chat-list';
import { ChatContent } from './chat-content/chat-content';
import classes from './styles.module.css';
import { useState } from 'react';
import { chatInitialValue } from '../../constants/constants';

export interface Chat {
  _id: string;
  name: string;
  lastMsg: string;
}

export const MainContent = () => {
  // Current chat. Starts as an empty object
  const [selectedChat, setSelectedChat] = useState<Chat>(chatInitialValue);

  // Variable to trigger the chat list to fetch new data. Starts true to call fetch when the component is rendered
  const [needUpdateChats, setNeedUpdateChats] = useState<boolean>(true);

  return (
    <div className={classes.contentDiv}>
      <ChatList
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        needUpdateChats={needUpdateChats}
        setNeedUpdateChats={setNeedUpdateChats}
      />
      <ChatContent
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        setNeedUpdateChats={setNeedUpdateChats}
      />
    </div>
  );
};
