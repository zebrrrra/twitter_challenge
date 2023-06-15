
import RecommendList from '../../components/RecommendList/RecommendList';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
// import ReplyMain from '../../components/ReplyMain/ReplyMain';
import { ReplyMainInTest } from '../../components';
import style from './ReplyPage.module.scss'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ReplyPage = () => {


  // const { isAuthenticated } =useAuth();
  // const navigate =useNavigate();
  // useEffect(()=>{
  // if (!isAuthenticated){
  //   navigate ('/login');
  // }
  // }
  // ,[navigate,isAuthenticated])

  return (
    <div className={style.replyContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <ReplyMainInTest />
          {/* <ReplyMain /> */}
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default ReplyPage;