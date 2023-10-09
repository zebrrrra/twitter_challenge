import { useState, useEffect } from "react";
import { getUsers } from "../apis/user";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFollowShips, deleteFollowShips } from "../apis/followship";
import { useChat } from "../context/ChatContext";
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
// const useFollow = (
//   loginUserId,
//   setFollowingUsers = () => { },
//   setFollowerUsers = () => { },
//   setRecommendUsers = () => { },
//   setUpdateTag
// ) => {
//   const [updateTag, setLocalUpdateTag] = useState(false);
//   //let updateTagGlobal = false;
//   //const setUpdateTagGlobal = () => updateTagGlobal = !updateTagGlobal;

//   const handleFollow = async (id) => {
//     try {
//       const response = await postFollowShips(id);
//       if (response && response.status === 'success') {
//         setLocalUpdateTag(!updateTag);

//         //Following的用戶清單
//         setFollowingUsers((currentUsers) => {
//           const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
//           return updatedUsers.map((user) =>
//             user.id === id ? { ...user, isCurrentUserFollowed: true } : user
//           );
//         });

//         //Follower的用戶清單
//         setFollowerUsers((currentUsers) => {
//           const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
//           return updatedUsers.map((user) =>
//             user.id === id ? { ...user, isCurrentUserFollowed: true } : user
//           );
//         });

//         // 更新推薦用戶列表
//         setRecommendUsers((currentUsers) => {
//           const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
//           return updatedUsers.map((user) =>
//             user.id === id ? { ...user, isCurrentUserFollowed: true } : user
//           );
//         });

//         setUpdateTag(prevState => !prevState);
//       }
//     } catch (error) {
//     }
//   };



//   const handleUnFollow = async (id) => {
//     try {
//       const response = await deleteFollowShips(id);
//       if (response && response.status === 'success') {
//         setLocalUpdateTag(!updateTag);
//         //Following的用戶清單
//         setFollowingUsers((currentUsers) => {
//           const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
//           return updatedUsers.map((user) =>
//             user.id === id ? { ...user, isCurrentUserFollowed: false } : user
//           );
//         });
//         //Follower的用戶清單
//         setFollowerUsers((currentUsers) => {
//           const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
//           return updatedUsers.map((user) =>
//             user.id === id ? { ...user, isCurrentUserFollowed: false } : user
//           );
//         });
//         // 更新推薦用戶列表
//         setRecommendUsers((currentUsers) => {
//           const updatedUsers = Array.isArray(currentUsers) ? currentUsers : [currentUsers];
//           return updatedUsers.map((user) =>
//             user.id === id ? { ...user, isCurrentUserFollowed: false } : user
//           );
//         });
//         setUpdateTag(prevState => !prevState);
//       }
//     } catch (error) {
//       console.log('handleFollow error:', error);
//     }
//   };
//   return { loginUserId, handleFollow, handleUnFollow, updateTag };
// };