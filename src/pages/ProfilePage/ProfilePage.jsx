import RecommendList from '../../components/RecommendList/RecommendList';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import Main from '../../components/Main/Main';
import style from './ProfilePage.module.scss'
// import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useParmas } from 'react-router-dom';

const ProfilePage = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate();
  // const{}=useParmas()
  console.log(user)
  console.log(user.id)//可以取得
  console.log(user.name)
  console.log(user.avatar)
  const currentId = user.id
  /*不確定Router*/
  //const { isAuthenticated } =useAuth ();
  //const navigate = useNavigate ();
  //useEffect (()=>{
  // if (isAuthenticated){
  //    navigate ('/login');
  //  } else {
  //    navigate('/');
  //  }
  //})

  // const { isAuthenticated,user } =useContext(AuthContext);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])

  return (
    <div className={style.profileContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <Main currentId={currentId} />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;