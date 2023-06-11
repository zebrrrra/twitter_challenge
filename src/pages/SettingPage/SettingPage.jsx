//import { useAuth } from '';
//import { useEffect } from 'react;
//import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import { AuthInput } from '../../components';
import style from './SettingPage.module.scss'
import { PutUserSetting } from '../../api/user';

const SettingPage = () => {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  let message = ''

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = 104
    const data = await PutUserSetting({ id });
    console.log(data)
    if (!data) {
      console.log('error', data)
    }

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
  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <form className={style.form} onSubmit={handleSubmit}>
            <AuthInput label='帳號' id="account" type="text" placeholder="請輸入帳號" value={account} message={message} onChange={(accountValue) => setAccount(accountValue)} />

            <AuthInput label='名稱' id="name" type="text" placeholder="請輸入使用者名稱" value={name} maxLength={50} message={message} onChange={(nameValue) => setName(nameValue)} />

            <AuthInput label='Email' id="email" type="email" placeholder="請輸入Email" value={email} message={message} onChange={(emailValue) => setEmail(emailValue)} />

            <AuthInput label='密碼' id="password" type="password" placeholder="請輸入密碼" value={password} message={message} onChange={(passwordValue) => setPassword(passwordValue)} />

            <AuthInput label='密碼確認' id="confirm" type="password" placeholder="請再次輸入密碼" value={checkPassword} message={message} onChange={(checkPasswordValue) => setCheckPassword(checkPasswordValue)} />

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

export default SettingPage