import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import style from './ChatPrivateText.module.scss';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import { useChatUser } from "../../context/ChatUserContext";

const ChatPrivateText = ({ roomId }) => {
  const { socket } = useAuth() || {};
  const [history, setHistory] = useState({ empty: true, messages: [] });
  const { setChatUser } = useChatUser()

  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  const now = dayjs();

  useEffect(() => {
    if (socket) {
      // BUG emit兩次
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

  const handleTextClick = (targetData) => {
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
            <div className={style.chatUserCard} key={index} onClick={() => handleTextClick({ roomId: item.roomId, user: item.User })}>
              <img className={style.avatar} src={item.User.avatar} alt={item.User.name} />
              <div className={style.name}>{item.User.name}</div>
              <div className={style.userName}>@{item.User.account}</div>
              <div>{formatDate}</div>
              <div>{item.message.slice(0, 50)}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatPrivateText;