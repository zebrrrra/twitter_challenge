import Swal from "sweetalert2"
import { useState } from "react"
import { postATweetReply } from "../apis/tweet";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useChat } from "../context/ChatContext";

export const useReply = ({ id, comment, tweetOwnerId, onClose }) => {
  const [message, setMessage] = useState('')
  const socket = useChat()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      if (!comment.trim()) {
        Swal.fire({
          title: '內容不可空白',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        setMessage('內容不可空白')
        throw new Error('內容不可空白')
      }
      if (comment.length > 140) {
        Swal.fire({
          title: '內容超出上限',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        setMessage('內容不可超過140字')
        throw new Error('內容不可超過140字')
      }
      return await postATweetReply({ id, comment })
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        Swal.fire({
          title: '內容成功提交',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
          position: 'top',
        });
        queryClient.invalidateQueries(['getATweetReply', { id }]);//推文id
        queryClient.invalidateQueries(['getATweet', { id }]);//推文id
        queryClient.invalidateQueries(['getAllTweets']);

        socket.emit('client-push-notice', 'reply', tweetOwnerId)
        onClose(false)
        return
      }
    }
  })
  return { mutation, message }
}
export default useReply