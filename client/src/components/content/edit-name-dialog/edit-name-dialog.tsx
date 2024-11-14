import { Dialog, TextField } from '@mui/material';
import classes from './styles.module.css';
import { useState } from 'react';

interface EditNameDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newName: string) => Promise<void>;
  value: string;
}

export const EditNameDialog = (props: EditNameDialogProps) => {
  const { open, onClose, onSubmit, value } = props;
  const [currentValue, setCurrentValue] = useState<string>(value); // Current value of the chat name

  return (
    <Dialog open={Boolean(open)} onClose={onClose}>
      <div className={classes.dialog}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>Edit Chat Name</h3>
        <TextField
          placeholder='Add Chat Title'
          fullWidth
          color='success'
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
        <div className={classes.bottomButtons}>
          <button className={classes.cancelButton} onClick={() => onClose()}>
            Cancel
          </button>
          <button className={classes.confirmButton} onClick={() => onSubmit(currentValue)}>
            Confirm
          </button>
        </div>
      </div>
    </Dialog>
  );
};
