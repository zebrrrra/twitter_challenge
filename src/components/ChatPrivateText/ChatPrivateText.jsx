import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const ChatPrivateText = () => {
  const { socket } = useAuth() || {};
  const [history, setHistory] = useState({ empty: true, messages: [] });
  const { roomId } = useParams();

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

  console.log(history)

  return (
    <div className='history'>
      {history.empty ? (
        <div>尚未聊天過，開始發送訊息吧!</div>
      ) : (
        history.messages.map((item, index) => (
          <div className='historyItem' key={index}>
            <img src={item.User.avatar} alt={item.User.name} />
            <div>{item.User.name}</div>
            <div>{item.message.slice(0, 50)}</div>
          </div>
        ))
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