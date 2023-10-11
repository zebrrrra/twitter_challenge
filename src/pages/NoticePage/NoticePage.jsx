import { ChatNavbars, RecommendList, Header, NoticeCard } from "../../components";
import style from "./NoticePage.module.scss"
import useNotice from "../../hooks/NoticeHook";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const NoticePage = () => {
  const { notice } = useNotice()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])
  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars />
        </div>
        <div className={style.middleColumn}>
          <Header />
          {notice.length === 0 && <span>尚無任何通知</span>}
          {notice.map((n, index) => (<NoticeCard notice={n} key={index} />))}
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}
export default NoticePage