import { useState } from 'react'
import style from './RegisterPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link } from 'react-router-dom'
import { AuthInput } from '../../components'
import { useRegister } from '../../hooks/RegisterHook'
import { ClipLoader } from 'react-spinners'

const RegisterPage = () => {
  const [userData, setUserData] = useState({ account: '', name: '', email: '', password: '', checkPassword: '' })
  const { mutation, responseError, errorInfo } = useRegister(userData)

  const inputCollection = [
    { name: 'account', label: '帳號', id: '帳號', type: 'text', placeholder: '請輸入帳號', value: userData.account, onChange: (value) => setUserData(prev => ({ ...prev, 'account': value })), disabled: mutation.isLoading },
    { name: 'name', label: '名稱', id: '名稱', type: 'text', placeholder: '請輸入使用者名稱', value: userData.name, maxLength: 50, onChange: (value) => setUserData(prev => ({ ...prev, 'name': value })), disabled: mutation.isLoading },
    { name: 'email', label: 'Email', id: 'email', type: 'email', placeholder: '請輸入Email', value: userData.email, onChange: (value) => setUserData(prev => ({ ...prev, 'email': value })), disabled: mutation.isLoading },
    { name: 'password', label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: userData.password, onChange: (value) => setUserData(prev => ({ ...prev, 'password': value })), disabled: mutation.isLoading },
    { name: 'checkPassword', label: '密碼確認', id: '密碼確認', type: 'password', placeholder: '請再次輸入密碼', value: userData.checkPassword, onChange: (value) => setUserData(prev => ({ ...prev, 'checkPassword': value })), disabled: mutation.isLoading },
  ];
  const override = {
    position: 'absolute',
  };

  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>建立你的帳號</h3>
      <ClipLoader size={60} color='#cccccc' loading={mutation.isLoading} cssOverride={override} />
      <form className={style.form} onSubmit={mutation.mutate}>
        {inputCollection.map(({ label, id, type, placeholder, value, maxLength, onChange, name, disabled }) => (
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
            name={name}
            disabled={disabled}
          />
        ))}
        <button className={style.button} type="submit" disabled={mutation.isLoading}>註冊</button>
      </form >
      <div className={style.linkGroup}>
        <Link to='/login' className={style.link} >取消</Link>
      </div>
    </div>
  )
}
export default RegisterPage
