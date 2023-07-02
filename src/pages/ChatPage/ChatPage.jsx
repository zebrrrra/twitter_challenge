import style from './ChatPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import {ChatNavbar, ChatMessage} from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ChatPage = () => {

  const { isAuthenticated, user } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbar/>
        </div>
        <div className={style.middleColumn}>

        </div>
        <div className={style.rightColumn}>
          <ChatMessage/>
        </div>
      </div>
    </div>
  )
}

export default ChatPage;