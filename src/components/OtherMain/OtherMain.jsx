import OtherUserInfo from '../OtherUserInfo/OtherUserInfo';
import Tab from '../Tab/Tab';

const OtherMain = ({ userId, isSubscribed }) => {

  return (
    <>
      <OtherUserInfo userId={userId} isSubscribed={isSubscribed} />
      <Tab userId={userId} />
    </>
  )

}

export default OtherMain;
