import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import style from './ChatUser.module.scss';

const ChatUser = () => {

const {socket}=useAuth()||{};
const [usersUpdate, setUsersUpdate]=useState([]);

useEffect(()=>{

const savedUpdate= localStorage.getItem('usersUpdate');
if(savedUpdate){
  setUsersUpdate(JSON.parse(savedUpdate));
}

  if(socket){
  const handleUserUpdate =(res)=>{
    console.log('res:',res); 
    setUsersUpdate(res.map(user=>({
      account: user.account,
      name: user.name,
      avatar: user.avatar
    })))
    
  };
  socket.on('server-update', handleUserUpdate);


  return () => {
    socket.off('server-update', handleUserUpdate);
  };
}
}, [socket]);

useEffect(() => {
  localStorage.setItem('usersUpdate',JSON.stringify(usersUpdate));
  console.log('userUpdate:',usersUpdate);
}, [usersUpdate]);

return(
  <>

    <div className={style.onLineUser}>上線使用者({usersUpdate.length})</div>
    {usersUpdate.map((user,index)=>(
          <div className={style.chatUserCard}>
      <div key={index}>
      <div className={style.userInfo}>
        <p><img className={style.avatar}src={user.avatar} alt ="Avatar"/></p>
        <div className={style.name}>{user.name}</div>
        <div className={style.userName}> @{user.account}</div>
        </div>
        </div>
        </div>
    ))}


  </>
)


}

export default ChatUser;


