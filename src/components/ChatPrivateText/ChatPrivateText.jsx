import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const ChatPrivateText = () => {
  const { socket } = useAuth() || {};
  const [history, setHistory] = useState({ empty: false, messages: [] });
  const { roomId } = useParams();

  useEffect(() => {
    if (socket) {
      socket.emit("client-record", roomId);
      socket.on("server-record", (res) => {
        if (Array.isArray(res)) {
          setHistory({ empty: false, messages: res });
        } else if (res === "尚未聊天過，開始發送訊息吧!") {
          setHistory({ empty: true, messages: [] });
        } else {
          console.error("Unexpected server response:", res);
        }
      });

      return () => {
        socket.off("server-record");
      };
    }
  }, [socket, roomId]);

  return (
    <div className='history'>
      {history.empty ? (
        <div>尚未聊天過，開始發送訊息吧!</div>
      ) : (
        history.messages.map((item) => (
          <div className='historyItem'>
            <img src={item.user.avatar} alt={item.user.name} />
            <div>{item.user.name}</div>
            <div>{item.message.slice(0, 50)}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatPrivateText;