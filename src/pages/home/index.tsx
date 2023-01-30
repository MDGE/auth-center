import { useAtom } from 'jotai';
import { accountAtom } from 'store/atom/jotai-atom';
import { useMounted } from 'common/hooks/useMounted';
import { env } from 'utils/env';
import src1 from 'assets/img/w11.jpeg';
function Index() {
  const [account] = useAtom(accountAtom);
  console.log(account, env[NODE_ENV], NODE_ENV, 111);
  const isMounted = useMounted()();
  if (!isMounted) {
    console.log('home初始化');
  }
  return (
    <div>
      {account?.name}
      <p className="text-3xl font-bold text-amber-700">当前环境：{NODE_ENV}</p>
      <img src={src1} style={{ width: '100px' }} />
    </div>
  );
}
export default Index;
