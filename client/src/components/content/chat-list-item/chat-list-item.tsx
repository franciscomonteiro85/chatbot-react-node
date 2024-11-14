import { Chat } from '../main.content';
import classes from './styles.module.css';

interface ChatListItemProps {
  chat: Chat;
  selected?: boolean;
}

// Chat list element that displays the chat's name and the last written message
export const ChatListItem = (props: ChatListItemProps) => {
  return (
    <div className={props.selected ? classes.selectedItemDiv : classes.chatListItemDiv}>
      <h5>{props.chat.name}</h5>
      <div className={classes.lastMsgDiv}>
        <span className={classes.lastMsg}>{props.chat.lastMsg}</span>
      </div>
    </div>
  );
};
