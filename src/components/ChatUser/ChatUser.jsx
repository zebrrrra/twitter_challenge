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
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    // 檢查是否已有存在上線名單
    const savedUpdate = localStorage.getItem('usersUpdate');
    console.log('savedUpdate', JSON.parse(savedUpdate))//列表空時為null
    if (JSON.parse(savedUpdate)?.length !== 0) {
      setUsersUpdate(JSON.parse(savedUpdate));
    }

    if (socket) {
      // listen others online and offline, not self
      // BUG 自己join有時可以監聽到update,有時卻不行
      const handleUserUpdate = (res) => {
        if (res) {
          setLoading(false)
        }
        console.log('res:', res);
        setUsersUpdate(res.filter(({ id }) => id !== user.id).map(user => ({
          id: user.id,
          account: user.account,
          name: user.name,
          avatar: user.avatar
        })))
      };
      socket.emit('client-join', user?.id);
      socket.on('server-update', handleUserUpdate);

      return () => {
        socket.off('server-update', handleUserUpdate);
        setLoading(true)
      };
    }
  }, [socket]);

  useEffect(() => {
    console.log('userUpdate', usersUpdate)
    if (usersUpdate) {
      // userupdata初始是null
      localStorage.setItem('usersUpdate', JSON.stringify(usersUpdate));
    }
    // 若上線列表更新，更新localStorage的usersUpdate
  }, [usersUpdate?.length]);



  const navigate = useNavigate();

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

      <div className={style.onLineUser}>上線使用者({usersUpdate?.length})</div>
      {/* {loading && (<Skeleton count={5} className={style.skeleton} />)} */}
      {usersUpdate?.length !== 0 && usersUpdate?.map((user) => (
        <div className={style.chatUserCard} onClick={() => handleAvatarClick(user.id)} key={user.id}>
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
