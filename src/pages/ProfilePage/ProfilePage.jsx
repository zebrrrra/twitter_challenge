import style from './ProfilePage.module.scss'
import { ChatNavbars, Header, Main, RecommendList } from '../../components';
import { useAuth } from '../../context/AuthContext'

const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <div className={style.profileContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars />
        </div>
        <div className={style.middleColumn}>
          <Header userId={user?.id} />
          <Main userId={user?.id} />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}


export default ProfilePage;