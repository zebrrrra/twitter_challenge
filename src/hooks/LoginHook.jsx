import * as jwt from 'jsonwebtoken';
import { login } from '../apis/user'
import { useAuth } from "../context/AuthContext";
import { socket } from '../apis/socket';

const useLogin = () => {
  const { setPayload, setIsAuthenticated } = useAuth();

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
      //socket.io手動連線
      socket.connect()
      socket.on('connect', () => {
        console.log('connect to: login success', socket.connected)
      })
      socket.emit('client-join', tempPayload.id);

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