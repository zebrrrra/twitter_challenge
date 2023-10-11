import style from './LoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthInput } from '../../components'
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react'
import { useLogin } from '../../hooks/LoginHook';
import { socket } from '../../apis/socket';
import { ClipLoader } from 'react-spinners';

const override = {
  position: 'absolute',
  bottom: '50%'
};

const LoginPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate()
  const [userData, setUserData] = useState({ account: '', password: '' })
  const { mutation, responseError, errorInfo } = useLogin(userData)

  const authInputCollection = [
    { label: '帳號', id: '帳號', type: 'text', placeholder: '請輸入帳號', value: userData.account, onChange: (value) => setUserData(prev => ({ ...prev, 'account': value })), disabled: mutation.isLoading },
    { label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: userData.password, onChange: (value) => setUserData(prev => ({ ...prev, 'password': value })), disabled: mutation.isLoading }]

  useEffect(() => {
    if (mutation.data?.status === 'success') {
      socket.connect()
      socket.on('connect', () => {
        console.log('connect to: login success', socket.connected)
        socket.emit('client-join', user.id);
      })
    }
  }, [mutation.data?.status]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/main')
    }
  }, [navigate, isAuthenticated, user]);

  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>登入Alphitter</h3>
      <ClipLoader size={60} color='#cccccc' loading={mutation.isLoading} cssOverride={override} />
      <form className={style.form} onSubmit={mutation.mutate}>
        {authInputCollection.map(({ label, id, type, placeholder, value, maxLength, onChange, disabled }) => (
          <AuthInput
            key={id}
            label={label}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
            onChange={onChange}
            responseError={responseError}
            errorInfo={errorInfo}
            disabled={disabled}
          />
        ))}
        <button className={style.button} type="submit" disabled={mutation.isLoading} >登入</button>
      </form >
      <div className={style.linkGroup}>
        <Link to='/register' className={style.link}>註冊</Link>
        ・
        <Link to='/admin' className={style.link}>後台登入</Link>
      </div>
    </div>
  )
}



export default LoginPage