import ReactDOM from 'react-dom/client';
import App from 'pages/App';
import ErrorBoundary from 'common/error-boundary';
import PageErrorFallback from 'common/error-boundary/beautifulError';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './index.css';
const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
  <ConfigProvider locale={zhCN}>
    <ErrorBoundary fallbackRender={PageErrorFallback}>
      <App />
    </ErrorBoundary>
  </ConfigProvider>,
);
