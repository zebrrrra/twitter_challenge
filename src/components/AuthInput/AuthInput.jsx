import style from './AuthInput.module.scss'
const AuthInput = ({ label, id, type, placeholder, value, maxLength, onChange, message }) => {
  const isExceeded = value.length > maxLength;
  let inputStyle = style.inputGroup;
  const number = value.length
  let notExisted = true

  // // 與字數限制相關之錯誤邏輯
  if (isExceeded) {
    inputStyle = style.inputGroupError;
    message = '字數超出上限!'
  }

  // // 帳號不存在
  // if (notExisted) {
  //   message = '帳號不存在!'


  // }
  return (
    <>
      <div className={inputStyle}>
        <label className={style.label} htmlFor={id}>{label}</label>
        <input type={type} className={style.input} id={id} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
      <small className={style.small}>
        {isExceeded && <span className={`${style.hint} ${style.hintLeft}`}>{message}
        </span>}

        {value && <span className={`${style.hint} ${style.hintRight}`}>
          {number}/50
        </span >}
      </small >
    </>
  )
}
export default AuthInput