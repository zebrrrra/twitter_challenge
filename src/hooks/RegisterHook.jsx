import Swal from 'sweetalert2'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../apis/user'
import { useMutation } from '@tanstack/react-query'

export const useRegister = (user) => {
  const [responseError, setResponseError] = useState(false)
  const [errorInfo, setErrorInfo] = useState('')
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (e) => {
      e.preventDefault()
      if (!user.account.trim() || !user.password.trim() || !user.name.trim() || !user.checkPassword.trim() || !user.email.trim()) {
        Swal.fire({
          title: '內容不可為空白',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        throw new Error('內容不可空白')
      }
      return await register({ account: user.account, name: user.name, password: user.password, email: user.email, checkPassword: user.checkPassword })
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        Swal.fire({
          title: `${data.message}`,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        setResponseError(false)
        navigate('/login')
        return
      } else {
        Swal.fire({
          title: `${data.message}`,
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
