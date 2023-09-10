import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { putUserSetting } from "../apis/user";
import Swal from 'sweetalert2';

const useSetting = ({ id, user }) => {
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
        throw new Error('內容不可空白')
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

export default useSetting