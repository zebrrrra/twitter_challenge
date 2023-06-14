import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import { AuthInput } from '../../components';
import style from './SettingPage.module.scss'
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';


const SettingPage = () => {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  // const [errorInfo, setErrorInfo] = useState('')

  const { putUserSetting, isAuthenticated, user, responseError, errorInfo, setErrorInfo, setResponseError } = useAuth()

  const authInputCollection = [
    { label: '帳號', id: 'account', type: 'text', placeholder: '請輸入帳號', value: account, onChange: (accountValue) => setAccount(accountValue) },
    { label: '名稱', id: 'name', type: 'text', placeholder: '請輸入使用者名稱', value: name, maxLength: 50, onChange: (nameValue) => setName(nameValue) },
    { label: 'Email', id: 'email', type: 'email', placeholder: '請輸入Email', value: email, onChange: (emailValue) => setEmail(emailValue) },
    { label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: password, onChange: (passwordValue) => setPassword(passwordValue) },
    { label: '密碼確認', id: '密碼確認', type: 'password', placeholder: '請再次輸入密碼', value: checkPassword, onChange: (checkPasswordValue) => setCheckPassword(checkPasswordValue) },
  ];
  const handleSubmit = async (e) => {
    const id = user.id
    console.log(id)
    e.preventDefault();



    // const id = 14
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
    const success = await putUserSetting({
      id,
      account,
      name,
      email,
      password,
      checkPassword

    });
    console.log(success)
    if (success) {

      Swal.fire({
        title: '編輯成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      // setAccount('');
      // setName('');
      // setEmail('');
      // setPassword('');
      // setCheckPassword('');
      return
    }

    if (!success) {

      Swal.fire({
        title: '編輯失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      return
    }
    // console.log(errorInfo)//空的
  }
  console.log(errorInfo)
  console.log(responseError)
  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/login');
  //   } else {
  //     navigate('/:id/*');
  //   }
  // })

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <form className={style.form} onSubmit={handleSubmit}>
            {authInputCollection.map(({ label, id, type, placeholder, value, maxLength, onChange }) => (
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
              />
            ))}
            <button className={style.button} type="submit">儲存</button>
          </form >
        </div>
        <div className={style.rightColumn}>
          <div className={style.navbarContainer}></div>

        </div>
      </div>
    </div>
  )
}


/*不確定Router*/



export default SettingPage