import { useState } from "react"
import Swal from 'sweetalert2';
import { postTweets } from "../apis/tweet";

const useTweet = (onTweetSubmit) => {
  const [newTweet, setNewTweet] = useState(null)
  const [tweetText, setTweetText] = useState('');
  const [message, setMessage] = useState('')

  const handTweetSubmit = (newTweetValue) => {
    setNewTweet(newTweetValue)
  }

  const tweetSubmit = async () => {

    if (!tweetText.trim()) {
      Swal.fire({
        title: '內容不可空白',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setMessage('內容不可空白')
      return
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
      return
    }

    const { status } = await postTweets(tweetText)
    if (status === 'success') {
      Swal.fire({
        title: '內容成功提交',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        position: 'top',
      });
      onTweetSubmit(tweetText)
      setTweetText('');
      setMessage('')
      return
    }
  }
  return { newTweet, handTweetSubmit, tweetSubmit, message, tweetText, setTweetText, }
}
export default useTweet