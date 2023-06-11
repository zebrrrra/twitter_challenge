//import { useAuth } from '';
//import { useEffect } from 'react;
//import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import { AuthInput } from '../../components';
import style from './SettingPage.module.scss'
import { putUserSetting } from '../../apis/user';
import Swal from 'sweetalert2';

const SettingPage = () => {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = 134
    if (!account.trim() || !password.trim() || !name.trim() || !checkPassword.trim() || !email.trim()) {
      Swal.fire({
        title: '內容不可為空白',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      return
    }
    const { success, message, errInfo } = await putUserSetting({ id });
    if (success) {

      Swal.fire({
        title: message,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setError(false)
      return
    } else {

      console.log(errInfo)

      Swal.fire({
        title: errInfo,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setError(true)
      setMessage(errInfo)
      return
    }
  }

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <form className={style.form} onSubmit={handleSubmit}>
            <AuthInput label='帳號' id="account" type="text" placeholder="請輸入帳號" value={account} message={message} onChange={(accountValue) => setAccount(accountValue)} isError={error} />

            <AuthInput label='名稱' id="name" type="text" placeholder="請輸入使用者名稱" value={name} maxLength={50} message={message} onChange={(nameValue) => setName(nameValue)} isError={error} />

            <AuthInput label='Email' id="email" type="email" placeholder="請輸入Email" value={email} message={message} onChange={(emailValue) => setEmail(emailValue)} isError={error} />

            <AuthInput label='密碼' id="password" type="password" placeholder="請輸入密碼" value={password} message={message} onChange={(passwordValue) => setPassword(passwordValue)} isError={error} />

            <AuthInput label='密碼確認' id="confirm" type="password" placeholder="請再次輸入密碼" value={checkPassword} message={message} onChange={(checkPasswordValue) => setCheckPassword(checkPasswordValue)} isError={error} />

            <button className={style.button} type="submit">儲存</button>
          </form >
        </div>
        <div className={style.rightColumn}>
          <Navbar />
        </div>
      </div>
    </div>
  )
}


/*不確定Router*/
//const { isAuthenticated } =useAuth ();
//const navigate = useNavigate ();
//useEffect (()=>{
// if (isAuthenticated){
//    navigate ('/LoginPage');
//  } else {
//    navigate('/HomePage');
//  }
//})


export default SettingPage