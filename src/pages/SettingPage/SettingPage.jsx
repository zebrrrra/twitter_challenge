import style from './SettingPage.module.scss'
import { useState } from 'react'
import { AuthInput, ChatNavbars } from '../../components';
import { useAuth } from '../../context/AuthContext';
import useTweet from '../../hooks/TweetHook';
import { useGetUserQuery, usePutSettingQuery } from '../../hooks/QueryHook';
import Skeleton from 'react-loading-skeleton';


const SettingPage = () => {
  const { user } = useAuth()
  const { handTweetSubmit } = useTweet()
  const { data, isLoading } = useGetUserQuery(user?.id)
  const [userData, setUserData] = useState({ account: data?.account, name: data?.name, email: data?.email, password: '', checkPassword: '' })
  const { mutation, responseError, errorInfo } = usePutSettingQuery({ id: user.id, user: userData })

  if (isLoading) {
    return <Skeleton />
  }

  const inputCollection = [
    { name: 'account', label: '帳號', id: 'account', type: 'text', placeholder: '請輸入帳號', value: userData.account, onChange: (value) => setUserData(prev => ({ ...prev, 'account': value })) },
    { name: 'name', label: '名稱', id: 'name', type: 'text', placeholder: '請輸入使用者名稱', value: userData.name, maxLength: 50, onChange: (value) => setUserData(prev => ({ ...prev, 'name': value })) },
    { name: 'email', label: 'Email', id: 'email', type: 'email', placeholder: '請輸入Email', value: userData.email, onChange: (value) => setUserData(prev => ({ ...prev, 'email': value })) },
    { name: 'password', label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: userData.password, onChange: (value) => setUserData(prev => ({ ...prev, 'password': value })) },
    { name: 'checkPassword', label: '密碼確認', id: '密碼確認', type: 'password', placeholder: '請再次輸入密碼', value: userData.checkPassword, onChange: (value) => setUserData(prev => ({ ...prev, 'checkPassword': value })) },
  ];

  return (
    <>
      {mutation.isLoading ? (
        <div>轉圈中....</div>
      ) : (
        <div className={style.homeContainer}>
          <div className={style.homeColumn}>
            <div className={style.leftColumn}>
              <ChatNavbars onTweetSubmit={handTweetSubmit} />
            </div>
            <div className={style.middleColumn}>
              <div className={style.settingHeader}>帳戶設定</div>
              <form className={style.form} onSubmit={mutation.mutate}>
                {inputCollection.map(({ label, id, type, placeholder, value, maxLength, onChange, name }) => (
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
      )}
    </>
  )
}

export default SettingPage