import classes from './styles.module.css';
import { PortraitOutlined } from '@mui/icons-material';

export const Header = () => {
  // Static fields for both the project's title and for the username, since we dont have any account system
  const title = 'ChatBot';
  const userName = 'Francisco';

  return (
    <div className={classes.header}>
      <div className={classes.headerRow}>
        <h2 className={classes.headerTitle}>{title}</h2>
        <div className={classes.headerNav}>
          <ul className={classes.headerList}>
            <li className={classes.headerItem}>
              <PortraitOutlined />
            </li>
            <p className={classes.headerItem}>Welcome {userName}</p>
          </ul>
        </div>
      </div>
    </div>
  );
};
