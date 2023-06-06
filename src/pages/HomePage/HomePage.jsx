import RecommendList from'../../components/RecommendList/RecommendList';
//import Navbar from '../../components/Navbars/Navbars';
import style from './HomePage.module.scss'


export default function HomePage (){
 return(
   <>
    {/*<div className={style.leftColumn}><Navbar/></div>*/}
    <div className={style.middleColumn}></div>
    <div className={style.rightColumn}><RecommendList/></div>
    </>
 )
}
