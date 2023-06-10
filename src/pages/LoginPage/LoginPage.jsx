import style from './LoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthInput } from '../../components'
import { useState } from 'react'
import { login } from '../../apis/user'
import Swal from 'sweetalert2'

const LoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  let message = ''

  // error在其他使用到authinput的元件也會使用到，可以掛共用
  const [error, setError] = useState(true)

  const handleClick = async (e) => {
    if (!account.trim() || !password.trim()) {
      Swal.fire({
        title: '請先登入帳號',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      return
    }
    e.preventDefault();
    const data = await login({ account, password })
    const status = data.status

    if (status === 200) {
      // token得待在成功條件裡
      const token = data.data.data.token

      localStorage.setItem('token', token)

      Swal.fire({
        title: '登入成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      navigate('/profile')
      return
    } else {

      message = '帳號不存在!'

      Swal.fire({
        title: '登入失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
        position: 'top',
      });
      setError(true)
      return

    }
  }

  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>登入Alphitter</h3>
      <form className={style.form}>
        <AuthInput label='帳號' id="account" type="text" placeholder="請輸入帳號" value={account} onChange={(accountValue) => setAccount(accountValue)} maxLength={50} isError={error} />

        <AuthInput label='密碼' id="password" type="password" placeholder="請輸入密碼" value={password} onChange={(passwordValue) => setPassword(passwordValue)} isError={error} />
        <button className={style.button} type="submit" onClick={handleClick}>登入</button>
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



// email是帳號 後面會改
// 回傳token 和user包，axios拖去
// const data = await login({ email, password })

let message = ''
  // if(account不存在){
  //   message ='帳號不存在!'
  // }

  // if(account重複){
  //   message ='帳號已重複註冊!'
  // }
