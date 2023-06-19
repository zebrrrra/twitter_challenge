import { useEffect, useState } from 'react';
import style from './AuthInput.module.scss'
import { useAuth } from '../../context/AuthContext';

const AuthInput = ({ label, id, type, placeholder, value, maxLength, onChange, height = 54, responseError, errorInfo }) => {
  // responseError為後端回傳狀態，errorInfo後端錯誤資訊
  //這兩個變數為監控onChange 
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  // 檢測後端錯誤以及是否為錯誤對應欄位
  let DisplayError = responseError && errorInfo.includes(id);
  let AccountError = responseError && errorInfo.includes('不存在') && id === '帳號';

  const number = (value || '').length
  const containerStyle = {
    height: `${height}px`,
  };
  // 用來切換顯示紅線與否
  let inputStyle = style.inputGroupDefault;


  if (AccountError || DisplayError || error) {
    inputStyle += ` ${style.inputGroupError}`;
  }

  // 只有這兩種輸入框需要顯示數字
  let showNumber = label === '名稱' || label === '自我介紹'



  useEffect(() => {
    if (!maxLength) return
    if (number > maxLength) {
      setError(true);
      setMessage('字數超出上限！');
      return
    } else {
      setError(false);
      setMessage('');
    }
  }, [maxLength, number]);



  return (
    <>
      <div className={inputStyle} style={containerStyle}>
        <label className={style.label} htmlFor={id}>{label}</label>
        <input type={type} className={style.input} id={id} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
      <small className={style.small}>
        {DisplayError && (
          <span className={`${style.hint} ${style.hintLeft}`}>{errorInfo}</span>
        )}
        {AccountError && (
          <span className={`${style.hint} ${style.hintLeft}`}>{errorInfo}</span>
        )}


        {!DisplayError && message && (
          <span className={`${style.hint} ${style.hintLeft}`}>{message}</span>
        )}

        {value && <span className={`${style.hint} ${style.hintRight}`}>
          {showNumber && <span>{number} / {maxLength}</span>}
        </span >}
      </small >
    </>
  )
}
export default AuthInput








