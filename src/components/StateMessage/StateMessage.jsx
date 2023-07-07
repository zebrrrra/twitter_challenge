import style from "./StateMessage.module.scss"

const StateMessage = ({ message }) => {

  return (
    <div className={style.container}>
      <p>{message}</p>
    </div>
  )
}

export default StateMessage