import classes from './styles.module.css';

interface ChatMessageProps {
  sender: boolean;
  msg: string;
}

// Chat message component
export const ChatMessage = (props: ChatMessageProps) => {
  const { sender, msg } = props;
  return (
    <div
      className={classes.msg}
      style={{
        marginLeft: sender ? 'auto' : '0px',
        marginRight: sender ? '0px' : 'auto',
        backgroundColor: sender ? 'beige' : '#9edf9c',
      }}
    >
      <span>{msg}</span>
    </div>
  );
};
