import React from 'react';
import {Button, Dialog, DialogContent, DialogContentText, Divider, TextField, Typography} from '@material-ui/core';
import styles from './AuthDialog.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {MainForm} from "./main";
import {LoginForm} from "./login";
import {RegisterForm} from "./register";
interface AuthDialogProps {
  onClose: () => void,
  visible: boolean
}

export const AuthDialog: React.FC<AuthDialogProps> = ({onClose, visible}) => {
  const [formType, setFormType] = React.useState<'main' | 'login' | 'register'>('main')
  return (
      <Dialog
          open={visible}
          onClose={onClose}
      >
        <DialogContent>
          <DialogContentText>
            <div className={styles.content}>
              <Typography className={styles.title}>
                {formType === 'main' ? 'Вход в TJ' : <p onClick={() => setFormType('main')}
                    className={styles.backTitle}><ArrowBackIcon/>К авторизации</p>}
              </Typography>
              {formType === 'main' && <MainForm setFormType={setFormType}/>}
              {formType === 'login' && <LoginForm setFormType={setFormType}/>}
              {formType === 'register' && <RegisterForm setFormType={setFormType}/>}
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
  );
};
