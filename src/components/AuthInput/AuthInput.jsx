import { useEffect, useState } from 'react';
import style from './AuthInput.module.scss'

const AuthInput = ({ label, id, type, placeholder, value, maxLength, onChange, height = 54, responseError, errorInfo }) => {
  // const { setError } = useAuth()
  // responseError為後端回傳狀態，errorInfo後端錯誤資訊

  //這兩個變數為監控onChange 
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const number = value.length


  //既回傳錯誤又是相應的欄位，它的概念是若回傳訊息(errorInfo)為'帳號不存在'其內容(id)也包含在內的話就為true

  // const showError = responseError

  // 用來切換顯示紅線與否
  let inputStyle = style.inputGroupDefault;

  // 檢測兩種錯誤(onchange & api )和 是否為錯誤對應欄位
  // let isError = error || responseError && errorInfo.includes(id) before
  let isError = error || responseError



  if (isError) {
    inputStyle += ` ${style.inputGroupError}`;
  }
  const containerStyle = {
    height: `${height}px`,
  };

  // 只有這兩種輸入框需要顯示數字
  let showNumber = label === '名稱' || label === '自我介紹'
  let existed = message !== ''

  useEffect(() => {
    if (!maxLength) return
    if (number > maxLength) {
      setError(true);
      setMessage('字數超出上限');
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
        {isError && <span className={`${style.hint} ${style.hintLeft}`}>{existed ? message : errorInfo}
        </span>}

        {value && <span className={`${style.hint} ${style.hintRight}`}>
          {showNumber && <span>{number} / {maxLength}</span>}
        </span >}
      </small >
    </>
  )
}
export default AuthInput


// const AuthInput = ({ label, id, type, placeholder, value, maxLength, onChange, responseError, errorInfo }) => {

//   return (
//     <div>
//       <label htmlFor={id}>{label}</label>
//       <input
//         id={id}
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         maxLength={maxLength}
//         onChange={(e) => onChange(e.target.value)}
//         className={showError ? 'error' : ''} // 根據 showError 的值添加 error class
//       />
//       {showError && <span className="error-message">錯誤訊息</span>} // 根據 showError 的值顯示錯誤訊息
//     </div>
//   );
// };
// 在上述範例中，我們在 AuthInput 元件中新增了 showError 變數，用於判斷是否顯示錯誤訊息和樣式。如果 responseError 為 true，並且 errorInfo 包含了該輸入欄位的 id，則 showError 為 true。

// 根據 showError 的值，我們在 input 元素的 className 中添加了 error class，以便應用相應的錯誤樣式。同時，在條件 { showError && <span className="error-message">錯誤訊息</span> } 中，我們檢查 showError 的值並顯示相應的錯誤訊息。

// 請注意，上述代碼中的 error 和 error - message 是示例的 class 名稱，您可以根據您的樣式表定義自己的 class 名稱並進行樣式設置。

// 在 RegisterPage 元件中將 responseError 和 errorInfo 傳遞給 AuthInput 元件時，確保正確地設置這些狀態值。

// 這樣，當 API 回傳錯誤資訊中包含某個輸入欄位的 id 時，相應的輸入欄位將顯示錯誤樣式和錯誤訊息。其他欄位不會受到影響，不會顯示錯誤樣式和錯誤訊息。







