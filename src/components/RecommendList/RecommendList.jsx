import style from './RecommendList.module.scss';
import RecommendItem from '../RecommendItem/RecommendItem';
import { getTopFollowers } from '../../apis/user';
import { useQuery } from "@tanstack/react-query"
import Skeleton from 'react-loading-skeleton';
import { useAuth } from '../../context/AuthContext';
const RecommendList = () => {
  const { user } = useAuth()
  const { data, isLoading } = useQuery({ queryKey: ['getTopFollowers'], queryFn: getTopFollowers, enabled: !!user, refetchOnWindowFocus: false })

  if (isLoading) {
    return <Skeleton count={6} className={style.skeleton} />
  }
  return (
    <div className={style.recommendListContainer}>
      <div className={style.HeaderContainer}>
        <h4 className={style.RecommendHeader}>推薦跟隨</h4></div>
      {Array.isArray(data) && data.map(item => (
        <RecommendItem
          key={item.id}
          user={item}
        />
      ))}
    </div>
  )
};

export default RecommendList;