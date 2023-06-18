import Tab from '../Tab/Tab';
import UserInfo from '../UserInfo/UserInfo'
const Main = ({ userId }) => {

  return (
    <>
      <UserInfo userId={userId} />
      <Tab userId={userId} />
    </>
  )

}


export default Main;
