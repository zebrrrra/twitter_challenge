import OtherUserInfo from '../OtherUserInfo/OtherUserInfo';
import Tab from '../Tab/Tab';

const OtherMain = ({userId}) => {
  //const { id } = useParams();
  //const {user} = useAuth();

   return (
    <>
    <OtherUserInfo userId={userId}/>
    <Tab userId={userId}/>

    </>
  )

}

export default OtherMain;
