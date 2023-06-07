import style from './AuthInput.module.scss'
const AuthInput = ({ label, id, type, placeholder, number }) => {
  return (
    <>
      <div className={style.inputGroup}>
        <label className={style.label} htmlFor={id}>{label}</label>
        <input type={type} className={style.input} id={id} placeholder={placeholder} />
      </div><small className={style.small}>{number}/50</small>
    </>
  )
}
export default AuthInput