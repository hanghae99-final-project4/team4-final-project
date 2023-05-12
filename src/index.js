import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './Pages/GlobalStyle';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../src/Fonts/Font.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});
// retry 옵션은 API 실패 하면 설정 값 만큼 재시도 하는 옵션
// useErrorBoundary 옵션은 리액트 16 이상에서 제공하는 Fallback UI 설정에 대한 옵션
// 예기치못한 에러 케이스 생길 수 있기 때문에 quries와 mutations 에 true 값 설정
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    {/* devtools */}
    <ReactQueryDevtools initialIsOpen={true} />
    <GlobalStyle />
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
