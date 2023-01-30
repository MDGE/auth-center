import { useEffect, useState } from 'react';
import { useAtom, atom } from 'jotai';
import { atomWithImmer, useImmerAtom } from 'jotai-immer';
import { jAtom } from 'store/atom/jotai-atom';
import { useImmer } from 'common/hooks/useImmer';
import { Button } from 'antd';
function Index() {
  console.log('jotai');
  const [data, setjAtom] = useImmerAtom(jAtom);
  const [newData, setnewData] = useImmer<{ name: string; age: number; sex?: string }>({
    name: '红茶',
    age: 29,
  });
  useEffect(() => {
    console.log(newData, 444);
  }, [newData]);
  return (
    <div>
      <div>{123}</div>
      <div>{data.name}</div>
      <Button
        onClick={() =>
          setjAtom((c) => {
            c.name = '连花清瘟';
          })
        }
      >
        改变name
      </Button>
      <p>
        {newData.name}
        {newData.sex}
      </p>
      <Button
        type="primary"
        onClick={() =>
          setnewData(() => ({
            name: '连花清瘟',
            sex: '男',
          }))
        }
      >
        改变name
      </Button>
    </div>
  );
}
export default Index;
