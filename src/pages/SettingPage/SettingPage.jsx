import style from './SettingPage.module.scss'
import { useState } from 'react'
import { AuthInput, ChatNavbars } from '../../components';
import { useAuth } from '../../context/AuthContext';
import useTweet from '../../hooks/TweetHook';
import { useGetUserQuery } from '../../hooks/QueryHook';
import useSetting from '../../hooks/SettingHook';
import Skeleton from 'react-loading-skeleton';
import { ClipLoader } from 'react-spinners';

const SettingPage = () => {
  const { user, logout } = useAuth()
  const { handTweetSubmit } = useTweet()
  const { data, isLoading } = useGetUserQuery(user?.id)
  const [userData, setUserData] = useState({ account: data?.account, name: data?.name, email: data?.email, password: '', checkPassword: '' })
  const { mutation, responseError, errorInfo } = useSetting({ id: user?.id, user: userData })

  if (isLoading) {
    return <Skeleton />
  }


  const inputCollection = [
    { name: 'account', label: '帳號', id: 'account', type: 'text', placeholder: '請輸入帳號', value: userData.account, onChange: (value) => setUserData(prev => ({ ...prev, 'account': value })), disabled: mutation.isLoading },
    { name: 'name', label: '名稱', id: 'name', type: 'text', placeholder: '請輸入使用者名稱', value: userData.name, maxLength: 50, onChange: (value) => setUserData(prev => ({ ...prev, 'name': value })), disabled: mutation.isLoading },
    { name: 'email', label: 'Email', id: 'email', type: 'email', placeholder: '請輸入Email', value: userData.email, onChange: (value) => setUserData(prev => ({ ...prev, 'email': value })), disabled: mutation.isLoading },
    { name: 'password', label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: userData.password, onChange: (value) => setUserData(prev => ({ ...prev, 'password': value })), disabled: mutation.isLoading },
    { name: 'checkPassword', label: '密碼確認', id: '密碼確認', type: 'password', placeholder: '請再次輸入密碼', value: userData.checkPassword, onChange: (value) => setUserData(prev => ({ ...prev, 'checkPassword': value })), disabled: mutation.isLoading },

  ];
  const override = {
    position: 'absolute',
    translate: '-50%',
    bottom: '50%',
  };

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars onTweetSubmit={handTweetSubmit} />
        </div>
        <div className={style.middleColumn}>
          <div className={style.settingHeader}>帳戶設定</div>
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
            <button className={style.button} type="submit" disabled={mutation.isLoading}>儲存</button>
            <a className={style.logout} onClick={logout}>登出</a>
          </form >
        </div>
        <div className={style.rightColumn}>
          <div className={style.navbarContainer}></div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage