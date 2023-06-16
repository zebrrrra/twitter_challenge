import RecommendList from '../../components/RecommendList/RecommendList';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import Main from '../../components/Main/Main';
import style from './OtherProfilePage.module.scss'
import {useAuth} from '../../context/AuthContext'
import { useParams } from 'react-router-dom';
import OtherMain from '../../components/OtherMain/OtherMain';
const OtherProfilePage = () => {
  const {  user } = useAuth()
  const { id } = useParams();  // 從 URL 參數中取得 userId
  const userId = id || user.id;  // 如果 URL 參數中有 userId，就使用它，否則使用當前用戶的 ID 
  return (
    <div className={style.profileContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <Header userId={userId}/>
          <OtherMain userId={userId}/>
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default OtherProfilePage;