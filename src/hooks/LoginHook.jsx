import * as jwt from 'jsonwebtoken';
import { login } from '../apis/user'
import { adminLogin } from "../apis/admin"
import { useAuth } from "../context/AuthContext";
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export const useLogin = (user) => {
  const [responseError, setResponseError] = useState(true)
  const [errorInfo, setErrorInfo] = useState('')

  const { setPayload, setIsAuthenticated } = useAuth();
  const navigate = useNavigate()


  const mutation = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      if (!user.account.trim() || !user.password.trim()) {
        Swal.fire({
          title: '請先登入帳號',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        throw new Error('請先登入帳號')
      }
      return await login({ account: user.account, password: user.password, })
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        const { token } = data.data;
        const tempPayload = jwt.decode(token);
        localStorage.setItem('token', token);
        setPayload(tempPayload);
        setIsAuthenticated(true);
        setResponseError(false)
        Swal.fire({
          title: '登入成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        navigate('/main')
      } else {
        setPayload(null);
        setIsAuthenticated(false);
        setResponseError(true)
        setErrorInfo(data.message)
        Swal.fire({
          title: '登入失敗',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
      }
    }
  })

  return { mutation, responseError, errorInfo }
}

export const useAdminLogin = (user) => {
  const [responseError, setResponseError] = useState(true)
  const [errorInfo, setErrorInfo] = useState('')
  const { setPayload, setIsAuthenticated } = useAuth();

  const mutation = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      if (!user.account.trim() || !user.password.trim()) {
        Swal.fire({
          title: '請先登入帳號',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        throw new Error('請先登入帳號')
      }
      return await adminLogin({ account: user.account, password: user.password, })
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        const { token } = data.data;
        const tempPayload = jwt.decode(token);
        setPayload(tempPayload);
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
        Swal.fire({
          title: '登入成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        setResponseError(false)
      } else {
        setPayload(null);
        setIsAuthenticated(false);
        Swal.fire({
          title: '登入失敗',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        setResponseError(true)
        setErrorInfo(data.message)
      }
    }
  })

  return { mutation, responseError, errorInfo }
}