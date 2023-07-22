
import RecommendList from '../../components/RecommendList/RecommendList';
import ChatNavbars from '../../components/ChatNavbar/ChatNavbars';
import Header from '../../components/Headers/Headers';
import { ReplyMainInTest } from '../../components';
import style from './ReplyPage.module.scss'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ReplyPage = () => {

  return (
    <div className={style.replyContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <ReplyMainInTest />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default ReplyPage;