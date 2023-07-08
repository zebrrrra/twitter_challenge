import style from "./StateMessage.module.scss"
import { useRef, useEffect } from "react";

const StateMessage = ({ message }) => {
  const stateRef = useRef()

  useEffect(() => {
    stateRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [message])

  return (
    <div className={style.container} ref={stateRef}>
      <p>{message}</p>
    </div>
  )
}

export default StateMessage