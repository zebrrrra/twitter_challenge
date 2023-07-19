import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import style from './ChatUser.module.scss';
import { useNavigate } from 'react-router-dom';
import { useChatUser } from '../../context/ChatUserContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useChat } from '../../context/ChatContext';

const ChatUser = () => {
  const { user } = useAuth()
  const socket = useChat()
  const { setChatUser } = useChatUser()
  const [usersUpdate, setUsersUpdate] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUpdate = localStorage.getItem('usersUpdate');
    if (savedUpdate) {
      setUsersUpdate(JSON.parse(savedUpdate));
    }

    if (socket) {
      const handleUserUpdate = (res) => {
        console.log('res:', res);
        setUsersUpdate(res.filter(({ id }) => id !== user.id).map(user => ({
          id: user.id,
          account: user.account,
          name: user.name,
          avatar: user.avatar
        })))
      };
      socket.emit('client-join', user.id);
      socket.on('server-update', handleUserUpdate);

      return () => {
        socket.off('server-update', handleUserUpdate);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (usersUpdate) {
      localStorage.setItem('usersUpdate', JSON.stringify(usersUpdate));
    }
    console.log('userUpdate:', usersUpdate);
  }, [usersUpdate]);




  //傳遞資料
  const handleAvatarClick = (targetId) => {
    if (socket) {
      socket.emit('client-get-room', targetId);
      socket.on('server-get-room', roomId => {
        // navigate到PrivateChatPage並將roomId和targetId作為URL參數
        navigate(`/chat/${roomId}`);
        socket.off('server-get-room');
      });
    }
    const usersUpdate = JSON.parse(localStorage.getItem('usersUpdate'));
    if (usersUpdate) {
      const target = usersUpdate.filter(({ id }) => id === Number(targetId))
      setChatUser(target[0])
    }
  }

  return (

    <>

      <div className={style.onLineUser}>上線使用者({usersUpdate.length})</div>
      {usersUpdate.length === 0 && (<Skeleton count={5} className={style.skeleton} />)}
      {usersUpdate.map((user, index) => (
        <div className={style.chatUserCard} onClick={() => handleAvatarClick(user.id)}>
          <div className={style.userInfo}>
            <p><img className={style.avatar} src={user.avatar} alt="Avatar" /></p>
            <div className={style.name}>{user.name}</div>
            <div className={style.userName}> @{user.account}</div>
          </div>
        </div>

      ))}


    </>
  )


}

export default ChatUser;
