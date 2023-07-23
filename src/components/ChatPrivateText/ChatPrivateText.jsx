
import { useState, useEffect } from "react";
import style from './ChatPrivateText.module.scss';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import { useChatUser } from "../../context/ChatUserContext";
import { useChat } from "../../context/ChatContext";
import { useChatUnRead } from "../../context/ChatUnreadContext";

const ChatPrivateText = ({ roomId }) => {
  const socket = useChat()
  const { setChatUser } = useChatUser();
  const { chatUnRead } = useChatUnRead();

  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  const now = dayjs();

  const handleRoomClick = (targetData) => {
    // 防止重複點擊
    if (Number(roomId) === targetData.roomId) return
    console.log('房間號碼', targetData)
    setChatUser(targetData.user)
    navigate(`/chat/${targetData.roomId}`)
  }

  useEffect(() => {
    if (socket) {
      if (roomId) {
        socket.emit('client-enter-room', roomId);
      }
      return () => {
        socket?.off('server-enter-room');

      }
    }
  }, [roomId]);





  return (
    <div className='history'>
      <div className={style.onLineList}>訊息</div>

      {chatUnRead.empty ? (
        <div>尚未聊天過，開始發送訊息吧!</div>
      ) : (
        chatUnRead.messages.map((item, index) => {
          const messageDate = dayjs(item.timestamp);
          const formatDate = now.diff(messageDate, 'day') >= 1
            ? messageDate.format('YYYY/MM/DD')
            : messageDate.from(now);


          return (
            <div className={style.chatUserCard} key={index} onClick={() => handleRoomClick({ roomId: item.roomId, user: item.targetUser })}>
              <img className={style.avatar} src={item.targetUser.avatar} alt={item.targetUser.name} />
              <div className={style.userInfo}>
                <div className={style.userTime}>

                  <div className={style.name}>{item.targetUser.name}</div>
                  <div className={style.userName}>@{item.targetUser.account}</div>
                  <div className={style.time}>{formatDate}</div>
                </div>
                <div className={style.message}>{item.message.slice(0, 50)}</div>
                <div> {item.unreadMessageCounts}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatPrivateText;