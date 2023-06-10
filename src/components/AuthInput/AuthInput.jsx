import style from './AuthInput.module.scss'
const AuthInput = ({ label, id, type, placeholder, value, maxLength, onChange, height = 54, message, isError }) => {

  // 50,160字

  const isExceeded = value.length > maxLength;
  const number = value.length

  // 用來切換顯示紅線與否
  let inputStyle = style.inputGroupDefault;

  const containerStyle = {
    height: `${height}px`,
  };

  // 過濾是否為名稱表單
  let isName = label === '名稱'

  if (isError) {
    inputStyle += ` ${style.inputGroupError}`;
    // message = '字數超出上限!'
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
          {number}/{isName && { maxLength }}
        </span >}
      </small >
    </>
  )
}

export default AuthInput