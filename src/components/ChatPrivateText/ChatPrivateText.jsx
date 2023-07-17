import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import style from './ChatPrivateText.module.scss';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const ChatPrivateText = (roomId) => {
  const { socket } = useAuth() || {};
  const [history, setHistory] = useState({ empty: true, messages: [] });
  const navigate =useNavigate();
  dayjs.extend(relativeTime);
  const now =dayjs();

  useEffect(() => {
    if (socket) {
      // BUG emit兩次
      socket.emit("client-new-message",roomId);
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
  console.log(history)





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
            <div className={style.chatUserCard} key={index} onClick={() => navigate(`/chat/${item.roomId}`)}>
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


 // socket.on("client-record", (res) => {
    //   console.log(res)
    //   if (Array.isArray(res)) {
    //     setHistory({ empty: false, messages: res });
    //   } else if (res === "尚未聊天過，開始發送訊息吧!") {
    //     setHistory({ empty: true, messages: [] });
    //   } else {
    //     console.error("Unexpected server response:", res);
    //   }
    // });