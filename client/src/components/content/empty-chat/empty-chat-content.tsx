import classes from './styles.module.css';

// Default component for when there is no chat selected
export const EmptyChatContent = () => {
  return <div className={classes.emptyContentMainDiv}>Select a chat to start a conversation or create a new one</div>;
};
