import style from './AuthInput.module.scss'


const AuthInput = ({ label, id, type, placeholder, value, maxLength, onChange, height = 54, message, isError }) => {


  const number = value.length

  // 用來切換顯示紅線與否
  let inputStyle = style.inputGroupDefault;

  if (isError) {
    inputStyle += ` ${style.inputGroupError}`;
  }
  const containerStyle = {
    height: `${height}px`,
  };

  // 只有這兩種輸入框需要顯示數字
  let showNumber = label === '名稱' || label === '自我介紹'

  return (
    <>
      <div className={inputStyle} style={containerStyle}>
        <label className={style.label} htmlFor={id}>{label}</label>
        <input type={type} className={style.input} id={id} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
      <small className={style.small}>
        {/* 顯示紅線並且小字提示 */}
        {isError && <span className={`${style.hint} ${style.hintLeft}`}>{message}
        </span>}

        {value && <span className={`${style.hint} ${style.hintRight}`}>
          {showNumber && <span>{number} / {maxLength}</span>}
        </span >}
      </small >
    </>
  )
}

export default AuthInput
