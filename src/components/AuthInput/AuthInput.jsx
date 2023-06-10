import style from './AuthInput.module.scss'
const AuthInput = ({ label, id, type, placeholder, value, maxLength = 50, onChange, height = 54, message, isError }) => {


  const isExceeded = value.length > maxLength;

  // 用來切換顯示紅線與否
  let inputStyle = style.inputGroupDefault;

  const containerStyle = {
    height: `${height}px`,
  };
  const number = value.length
  let notExisted = true
  // 只有名稱顯示字數多少
  if (isExceeded) {
    inputStyle += ` ${style.inputGroupError}`;
    message = '字數超出上限!'
  }
  return (
    <>
      <div className={inputStyle} style={containerStyle}>
        <label className={style.label} htmlFor={id}>{label}</label>
        <input type={type} className={style.input} id={id} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
      <small className={style.small}>
        {isError && <span className={`${style.hint} ${style.hintLeft}`}>{message}
        </span>}

        {value && <span className={`${style.hint} ${style.hintRight}`}>
          {number}/{maxLength}
        </span >}
      </small >
    </>
  )
}

export default AuthInput