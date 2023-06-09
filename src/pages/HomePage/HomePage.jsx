//import { useAuth } from '';
//import { useEffect } from 'react;
//import { useNavigate } from 'react-router-dom';
import RecommendList from '../../components/RecommendList/RecommendList';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import Main from '../../components/Main/Main';
import style from './HomePage.module.scss'


const HomePage = () => {
  /*不確定Router*/
  //const { isAuthenticated } =useAuth ();
  //const navigate = useNavigate ();
  //useEffect (()=>{
  // if (isAuthenticated){
  //    navigate ('/LoginPage');
  //  } else {
  //    navigate('/HomePage');
  //  }
  //})
  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <Main />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default HomePage;