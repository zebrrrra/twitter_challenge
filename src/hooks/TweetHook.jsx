import { useState } from "react"
import Swal from 'sweetalert2';
import { postTweets } from "../apis/tweet";
import { useChat } from "../context/ChatContext";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext";
const useTweet = (onClose) => {
  const queryClient = useQueryClient()
  const [tweetText, setTweetText] = useState('');
  const [message, setMessage] = useState('')
  const socket = useChat()
  const { user } = useAuth()
  const mutation = useMutation({
    mutationFn: async () => {
      if (!tweetText.trim()) {
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
      if (tweetText.length > 140) {
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
      return await postTweets(tweetText)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['getAllTweets'] })
      queryClient.invalidateQueries({ queryKey: ['getUserTweets', { id: user.id }] })
      socket.emit('client-push-notice', 'tweet')
      if (data.status === 'success') {
        Swal.fire({
          title: '內容成功提交',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
          position: 'top',
        })
        setTweetText('');
        setMessage('')
        onClose && onClose(false)
        return
      }
    }
  })
  return { mutation, message, tweetText, setTweetText, }
}
export default useTweet