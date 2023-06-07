import style from './AdminLoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link } from 'react-router-dom'
import { AuthInput } from '../../components'

const AdminLoginPage = () => {
  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>後台登入</h3>
      <form className={style.form}>
        <AuthInput label='帳號' id="account" type="text" placeholder="請輸入帳號" number={0} />
        <AuthInput label='密碼' id="password" type="password" placeholder="請輸入密碼" number={0} />
        <button className={style.button} type="submit">登入</button>
      </form >
      <div className={style.linkGroup}>
        <Link to='/login' className={style.link}>前台登入</Link>
      </div>
    </div>
  )
}


export default AdminLoginPage