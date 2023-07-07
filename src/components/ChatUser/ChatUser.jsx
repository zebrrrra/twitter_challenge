import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ChatUser = () => {


}

export default ChatUser;



/*const { socket } = useAuth();
const [onlineUsers, setOnlineUsers] = useState([]);
const [onlineMessage, setOnlineMessage] = useState('');

useEffect(() => {
  if (socket) {
    socket.on('server-update', (users) => {
      setOnlineUsers(users);
    });
    socket.on('server-join', (message) => {
      setOnlineMessage(message);
    });
  }

  return () => {
    if (socket) {
      socket.off('server-update');
      socket.off('server-join');
    }
  };
}, [socket]);

return (
  <div>
    {onlineUsers.map(user => (
      <div key={user.id}>
        <img src={user.avatar} alt={user.name} />
        <p>{user.name}</p>
      </div>
    ))}
    <p>{onlineMessage}</p>
  </div>
);
};*/