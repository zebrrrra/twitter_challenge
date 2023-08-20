import { postLike, postUnLike } from '../apis/like';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useChat } from '../context/ChatContext';

export const useLike = ({ tweetId, userId }) => {
  const queryClient = useQueryClient()
  const socket = useChat()
  const likeMutation = useMutation({
    mutationFn: async () => {
      return await postLike(tweetId);
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries(['getAllTweets']);
        //BUG 在otherUserInfo不作用
        queryClient.invalidateQueries(['getUserTweets', { id: userId }]);//當前查看對象id
        //BUG 在otherUserInfo不作用
        queryClient.invalidateQueries(['getUserLike', { id: userId }]);//當前查看對象登入者id
        queryClient.invalidateQueries(['getATweet', { id: tweetId }]);//推文id
        socket.emit('client-push-notice', 'like', userId)
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return {
    likeMutation
  };
}

export const useUnlike = ({ tweetId, userId }) => {
  const queryClient = useQueryClient()
  const unlikeMutation = useMutation({
    mutationFn: async () => {
      return await postUnLike(tweetId)
    },
    onSuccess: (data) => {
      console.log(userId)
      if (data.status === 'success') {
        queryClient.invalidateQueries(['getAllTweets']);
        //BUG 在otherUserInfo不作用
        queryClient.invalidateQueries(['getUserTweets', { id: userId }]);
        //BUG 在otherUserInfo不作用
        queryClient.invalidateQueries(['getUserLike', { id: userId }]);
        queryClient.invalidateQueries(['getATweet', { id: tweetId }]);//推文id
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })
  return { unlikeMutation }
}