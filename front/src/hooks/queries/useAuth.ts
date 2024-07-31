import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {setEncryptStorage} from '../../../utils';
import {removeHeader, setHeader} from '../../../utils/header';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '../../apis/auth';
import {queryClinet} from '../../apis/queryClient';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/\bcommon';
import {queryKeys} from '../../../constants';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage('refreshToken', refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    // 로그인을 한 뒤에는 재 로그인이 되도록
    onSettled: () => {
      queryClinet.refetchQueries({
        queryKey: [queryKeys.AUTH, 'getAccessToken'],
      });
      queryClinet.invalidateQueries({queryKey: [queryKeys.AUTH, 'getProfile']});
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {data, isSuccess, isError} = useQuery({
    queryKey: [queryKeys.AUTH, 'getAccessToken'],
    queryFn: getAccessToken,
    staleTime: 100 * 60 * 30 - 100 * 60 * 3,
    refetchInterval: 100 * 60 * 30 - 100 * 60 * 3,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage('refreshToken', data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeHeader('refreshToken');
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: [queryKeys.AUTH, 'getProfile'],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeHeader('refreshToken');
    },
    onSettled: () => {
      queryClinet.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });

  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
}

export default useAuth;
