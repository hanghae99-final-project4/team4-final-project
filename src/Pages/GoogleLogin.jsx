import React from 'react';
import { trainApi } from '../apis/Instance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const GoogleLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    googleLogin();
  }, []);
  const code = new URL(window.location.href).searchParams.get('code');

  const googleLogin = async () => {
    try {
      const { data } = await trainApi.googleLogin(code);
      const token = data.token;
      const userId = data.result[0].id;
      const nickname = data?.result?.[0]?.nickname;
      if (data.token) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        !nickname ? navigate('/socialagree') : navigate('/subwaypage');
      }
    } catch (error) {
      return;
    }
  };

  return <Loading />;
};

export default GoogleLogin;
