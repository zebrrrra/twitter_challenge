import RecommendList from '../../components/RecommendList/RecommendList';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import MainPost from '../../components/MainPost/MainPost'
import style from './HomePage.module.scss'
import AllTweets from '../../components/AllTweets/AllTweets';


const HomePage = () => {
  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <MainPost />
          <AllTweets/>
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default HomePage;