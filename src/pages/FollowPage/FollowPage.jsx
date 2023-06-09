import RecommendList from'../../components/RecommendList/RecommendList';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import FollowTab from '../../components/Tab/FollowTab'; 
import FollowCard from '../../components/FollowCard/FollowCard'
import style from './FollowPage.module.scss'


export default function FollowPage (){
 return(
   <div className={style.followContainer}>
    <div className={style.followColumn}>
    <div className={style.leftColumn}><Navbar/></div>
    <div className={style.middleColumn}><Header/>
    <FollowTab/>
    <FollowCard/>
      </div>
    <div className={style.rightColumn}><RecommendList/></div>
    </div>
    </div>
 )
}
