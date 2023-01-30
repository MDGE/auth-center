import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
function Index() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的界面不存在！"
      extra={<Button onClick={() => navigate(-1)}>返回上一级</Button>}
    />
  );
}
export default Index;
