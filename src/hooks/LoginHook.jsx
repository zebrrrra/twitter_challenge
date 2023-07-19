import * as jwt from 'jsonwebtoken';
import { io } from 'socket.io-client';
import { login } from '../apis/user'
import { useAuth } from "../context/AuthContext";

const useLogin = () => {
  const { setPayload, setIsAuthenticated, setSocket } = useAuth();

  const handleLogin = async (data) => {
    const result = await login(
      {
        account: data.account,
        password: data.password,
      }
    );
    if (result.status === 'success') {
      const { token } = result.data;
      const tempPayload = jwt.decode(token);
      setPayload(tempPayload);
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
      //socket.io連線傳遞account
      const newSocket = io("https://twitter-ac-team-d93c31406834.herokuapp.com");
      newSocket.on('connect', () => {
        console.log('connect to: login success')
        setSocket(newSocket);
        newSocket.emit('client-join', tempPayload.id);
      })

      return {
        success: true, message: result.message, role: result.data.user.role
      }
    } else {
      setPayload(null);
      setIsAuthenticated(false);
      return {
        success: false, message: result.message
      }
    }
  }
  return { handleLogin }
}
export default useLogin