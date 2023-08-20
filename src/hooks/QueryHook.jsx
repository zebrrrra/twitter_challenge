import { useQuery } from "@tanstack/react-query"
import { getUser, getUserLike, getUserRepliedTweets, getUserFollowers, getUserFollowings, getUserTweets } from '../apis/user'
import { getAllTweets, getATweetReply, getATweet } from '../apis/tweet'
import { getAdminUsers, getAdminAllTweets } from "../apis/admin"
// getTopFollowersQuery暫時寫在RecommendList.jsx

// AllTweets.jsx
export const useGetAllTweetsQuery = () => {
  const { data, isLoading } = useQuery({ queryKey: ['getAllTweets'], queryFn: ({ signal }) => getAllTweets({ signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}

// UserInfo.jsx, OtherUserInfo.jsx, Headers.jsx
export const useGetUserQuery = (id) => {
  const { data, isLoading, isFetching } = useQuery({ queryKey: ['getUser', { id }], queryFn: ({ queryKey, signal }) => getUser({ id: queryKey[1].id, signal }), enabled: !!id, refetchOnWindowFocus: false })

  return { data, isLoading, isFetching }
}

// likeList.jsx,
export const useGetLikeQuery = (id) => {
  const { data, isLoading } = useQuery({ queryKey: ['getUserLike', { id }], queryFn: ({ queryKey, signal }) => getUserLike({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}

// MainReply.jsx
export const useGetATweetReplyQuery = (id) => {
  const { data, isLoading } = useQuery({ queryKey: ['getATweetReply', { id }], queryFn: ({ queryKey, signal }) => getATweetReply({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}
// ReplyList.jsx,
export const useGetUserRepliedTweetsQuery = (id) => {
  const { data, isLoading } = useQuery({ queryKey: ['getUserRepliedTweets', { id }], queryFn: ({ queryKey, signal }) => getUserRepliedTweets({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}
// ReplyMain.jsx(local state待移除), ReplyMainInTest.jsx
export const useGetATweetQuery = (id) => {
  const { data, isLoading } = useQuery({ queryKey: ['getATweet', { id }], queryFn: ({ queryKey, signal }) => getATweet({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}
// FollowTab.jsx
export const useGetUserFollowersQuery = (id, ...state) => {
  const { data, isLoading } = useQuery({ queryKey: ['getUserFollowers', { id, ...state }], queryFn: ({ queryKey, signal }) => getUserFollowers({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}
// FollowTab.jsx(沒用上)
export const useGetUserFollowingsQuery = (id, ...state) => {
  const { data, isLoading } = useQuery({ queryKey: ['getUserFollowings', { id, ...state }], queryFn: ({ queryKey, signal }) => getUserFollowings({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}
// TweetList.jsx
export const useGetUserTweetsQuery = (id) => {
  const { data, isLoading } = useQuery({ queryKey: ['getUserTweets', { id }], queryFn: ({ queryKey, signal }) => getUserTweets({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}
// AdminUserList.jsx
export const useGetAdminUserQuery = (id) => {
  const { data, isLoading } = useQuery({ queryKey: ['getAdminUsers', id], queryFn: ({ signal }) => getAdminUsers({ signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}
// AdminAllTweet.jsx
export const useGetAdminAllTweetsQuery = (state) => {
  const { data, isLoading } = useQuery({ queryKey: ['getAdminAllTweets', state], queryFn: ({ signal }) => getAdminAllTweets({ signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}


