import { useQuery, useMutation } from "@tanstack/react-query"
import { getUser, getUserLike, getUserRepliedTweets, getUserFollowers, getUserFollowings, getUserTweets, putUserSetting } from '../apis/user'
import { getAllTweets, getATweetReply, getATweet } from '../apis/tweet'
import Swal from 'sweetalert2';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
// SettingPage.jsx
export const usePutSettingQuery = ({ id, user }) => {
  const [responseError, setResponseError] = useState(false)
  const [errorInfo, setErrorInfo] = useState('')
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (e) => {
      e.preventDefault()
      if (!user.account?.trim() || !user.password?.trim() || !user.name?.trim() || !user.checkPassword?.trim() || !user.email?.trim()) {
        Swal.fire({
          title: '內容不可空白',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        return
      }
      return putUserSetting({
        id: id,
        account: user.account,
        name: user.name,
        email: user.email,
        password: user.password,
        checkPassword: user.checkPassword
      })
    },
    onSuccess: async (data) => {
      if (data.status === 'success') {
        Swal.fire({
          title: data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        setResponseError(false)
        navigate(`/profile`)
        return
      } else {
        Swal.fire({
          title: data.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        setResponseError(true)
        setErrorInfo(data.message)
        return
      }
    }
  })

  return {
    mutation, responseError, errorInfo
  }
}


