import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFollowShips, deleteFollowShips } from "../apis/followship";

// userId來自useParams，cardId是卡片的user
export const useFollow = ({ userId, cardId }) => {
  const queryClient = useQueryClient()
  const followMutation = useMutation({
    mutationFn: async () => {
      return await postFollowShips(cardId || userId)

    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        console.log(userId)
        queryClient.invalidateQueries(['getTopFollowers']);
        //  更新當前頁面的追隨清單（getUserFollowers）
        queryClient.invalidateQueries(['getUserFollowers', { id: userId }]);
        //  更新當前頁面的正在追隨清單（getUserFollowings）
        queryClient.invalidateQueries(['getUserFollowings', { id: userId }]);
        // 更新getUser
        queryClient.invalidateQueries(['getUser', { id: userId }]);
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return {
    followMutation
  };
}
export const useUnFollow = ({ userId, cardId }) => {
  const queryClient = useQueryClient()
  const unFollowMutation = useMutation({
    mutationFn: async () => {
      return await deleteFollowShips(cardId || userId)
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        console.log(userId)
        queryClient.invalidateQueries(['getTopFollowers']);
        //  更新被點擊者的追隨者清單（getUserFollowers）
        queryClient.invalidateQueries(['getUserFollowers', { id: userId }]);
        //  更新登入使用者的正在追隨清單（getUserFollowings）
        queryClient.invalidateQueries(['getUserFollowings', { id: userId }]);
        // 更新getUser
        queryClient.invalidateQueries(['getUser', { id: userId }]);

      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return {
    unFollowMutation
  };
}