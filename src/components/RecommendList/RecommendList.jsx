import style from './RecommendList.module.scss';
import RecommendItem from '../RecommendItem/RecommendItem';
import { getTopFollowers } from '../../apis/user';
import { useQuery } from "@tanstack/react-query"
import Skeleton from 'react-loading-skeleton';
import { useAuth } from '../../context/AuthContext';

const RecommendList = () => {
  const { data, isLoading } = useQuery({ queryKey: ['getTopFollowers'], queryFn: getTopFollowers, refetchOnWindowFocus: false })
  const { user } = useAuth();

  if (isLoading) {
    return <Skeleton count={6} className={style.skeleton} />
  }
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchTopFollowers = async () => {
  //     const userData = await getTopFollowers(abortController.signal);
  //     if (userData) {
  //       setUsers(userData);
  //     }
  //   }
  //   fetchTopFollowers();
  //   return () => {
  //     abortController.abort()
  //   }
  // }, [userId, updateTag]);
  return (
    <div className={style.recommendListContainer}>
      <div className={style.HeaderContainer}>
        <h4 className={style.RecommendHeader}>推薦跟隨</h4></div>
      {data && data.map(item => (
        <RecommendItem
          key={item.id}
          user={item}
          loginUserId={user.id}
        />
      ))}
    </div>
  )
};

export default RecommendList;