import { useQuery } from "@tanstack/react-query"
import { getUser, getUserLike, getUserRepliedTweets, getUserFollowers, getUserFollowings, getUserTweets } from '../apis/user'
import { getAllTweets, getATweetReply, getATweet } from '../apis/tweet'
import { getAdminUsers, getAdminAllTweets } from "../apis/admin"
// getTopFollowersQuery暫時寫在RecommendList.jsx

// AllTweets.jsx
export const useGetAllTweetsQuery = (...state) => {
  const { data, isLoading } = useQuery({ queryKey: ['getAllTweet', { ...state }], queryFn: ({ signal }) => getAllTweets({ signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}

// UserInfo.jsx, OtherUserInfo.jsx, Headers.jsx
export const useGetUserQuery = (id, ...state) => {
  const { data, isLoading } = useQuery({ queryKey: ['getUser', { id, ...state }], queryFn: ({ queryKey, signal }) => getUser({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}

// likeList.jsx,
export const useGetLikeQuery = (id, ...state) => {
  const { data, isLoading } = useQuery({ queryKey: ['getLike', { id, ...state }], queryFn: ({ queryKey, signal }) => getUserLike({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}

// MainReply.jsx,
export const useGetATweetReplyQuery = (id, ...state) => {
  const { data, isLoading } = useQuery({ queryKey: ['getATweetReply', { id, ...state }], queryFn: ({ queryKey, signal }) => getATweetReply({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}
// ReplyList.jsx,
export const useGetUserRepliedTweetsQuery = (id, ...state) => {
  const { data, isLoading } = useQuery({ queryKey: ['getUserRepliedTweets', { id, ...state }], queryFn: ({ queryKey, signal }) => getUserRepliedTweets({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

  return { data, isLoading }
}
// ReplyMain.jsx(local state待移除), ReplyMainInTest.jsx, LikeHook.jsx(未使用上)
export const useGetATweetQuery = (id, ...state) => {
  const { data, isLoading } = useQuery({ queryKey: ['getATweet', { id, ...state }], queryFn: ({ queryKey, signal }) => getATweet({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

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
// TweetList.jsx(有updateTag)
export const useGetUserTweetsQuery = (id, ...state) => {
  const { data, isLoading } = useQuery({ queryKey: ['getUserTweets', { id, ...state }], queryFn: ({ queryKey, signal }) => getUserTweets({ id: queryKey[1].id, signal }), refetchOnWindowFocus: false })

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


