
import { useState, useEffect } from "react";
import style from './ChatPrivateText.module.scss';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import { useChatUser } from "../../context/ChatUserContext";
import { useChat } from "../../context/ChatContext";

const ChatPrivateText = ({ roomId }) => {
  const socket = useChat()
  const [history, setHistory] = useState({ empty: true, messages: [] });
  const { setChatUser } = useChatUser()

  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  const now = dayjs();

  useEffect(() => {
    if (socket) {
      socket.emit("client-new-message");

      socket.on("server-new-message", (res) => {
        console.log('server-new-message', res)

        const messages = res.newMessageData
        if (messages.length === 0) {
          console.log('nothing is here')
          setHistory({ empty: true, messages })
        } else {
          console.log('something is here')
          setHistory({ empty: false, messages })
        }
      })
    }

    return () => {
      socket?.off("server-new-message");
    };
  }, [roomId]);


  const handleRoomClick = (targetData) => {
    console.log('房間號碼', targetData)
    setChatUser(targetData.user)
    navigate(`/chat/${targetData.roomId}`)
  }






  return (
    <div className='history'>
      <div className={style.onLineList}>訊息</div>

      {history.empty ? (
        <div>尚未聊天過，開始發送訊息吧!</div>
      ) : (
        history.messages.map((item, index) => {
          const messageDate = dayjs(item.timestamp);
          const formatDate = now.diff(messageDate, 'day') >= 1
            ? messageDate.format('YYYY/MM/DD')
            : messageDate.from(now);


          return (
            <div className={style.chatUserCard} key={index} onClick={() => handleRoomClick({ roomId: item.roomId, user: item.User })}>
              <img className={style.avatar} src={item.User.avatar} alt={item.User.name} />
              <div className={style.userInfo}>
                <div className={style.userTime}>
 
              <div className={style.name}>{item.User.name}</div>
              <div className={style.userName}>@{item.User.account}</div>
              <div className={style.time}>{formatDate}</div>
              </div>
              <div className={style.message}>{item.message.slice(0, 50)}</div>
            </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatPrivateText;