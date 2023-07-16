import style from './ChatPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { ChatNavbar, ChatRoom } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import ChatPrivateText from'../../components/ChatPrivateText/ChatPrivateText';

const PrivateChatPage = () => {

  const { isAuthenticated, user } = useAuth();
  const {roomId, userId} =useParams();
  const socket = useChat();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])

//const [roomId, setRoomId] =useState(4);
//const [selectedUserId, setSelectedUserId] =useState(null);
//const handleClick = (roomId, userId) =>{
//  setRoomId(roomId);
//  setSelectedUserId(userId);
//}


  // TODO 在ChatPage元件加上以下
  // 接收來自ChatUser的回調函式（攜帶著別人的name、account以及roomId）
 //const fakeName = 'user1'
  //const fakeRoomId = 304

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbar />
        </div>
        <div className={style.middleColumn}>
          <ChatPrivateText />
        </div>
        <div className={style.rightColumn}>
        <ChatRoom headerContext={user|| "公開聊天室"} roomId={roomId|| 4} userId={userId||304} />
        </div>
      </div>
    </div>
  )
}

export default PrivateChatPage;
