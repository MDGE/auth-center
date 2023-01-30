import { ReactElement, useState } from 'react';
import { InputNumber, Button, Form } from 'antd';

function Index() {
  const [electric, setElectric] = useState<number>(0);
  const [oilConsume, setOilConsume] = useState<number>(0);
  const [electricConsume, setElectricConsume] = useState<number>(0);
  const [dom, setDom] = useState<ReactElement | undefined>(undefined);
  const compute = () => {
    if (electric && oilConsume) {
      const dian100 = 100 / electric; // 每度电能跑的公里数
      const dianRun = electricConsume * dian100; // 电跑的里程
      // 实际油耗： 里程÷油
      const shijiYouHao = (oilConsume / (100 + dianRun)) * 100;
      setDom(
        <>
          <p>表显油耗：{oilConsume.toFixed(2)}L/100km</p>
          <p>表显电耗：{electricConsume.toFixed(2)}kWh/100km</p>
          <p>纯电电耗：{electric}kWh/100km</p>
          <p>实际电跑：{dianRun.toFixed(2)}km</p>
          <p>实际油耗：{shijiYouHao.toFixed(2)}L/100km</p>
          <p>油耗降低：{(oilConsume - shijiYouHao).toFixed(2)}L/100km</p>
        </>,
      );
    }
  };
  return (
    <div>
      <h4>油电折算比</h4>
      <Form name="basic" labelCol={{ style: { width: '100px' } }}>
        <Form.Item label="日常纯电电耗：">
          <InputNumber
            placeholder="日常纯电电耗"
            min={1}
            max={99999999}
            value={electric}
            onChange={(v) => setElectric(v as number)}
          />
        </Form.Item>
        <Form.Item label="表显油耗：">
          <InputNumber
            placeholder="表显油耗"
            min={1}
            max={99999999}
            value={oilConsume}
            onChange={(v) => setOilConsume(v as number)}
          />
        </Form.Item>
        <Form.Item label="表显充电量：">
          <InputNumber
            placeholder="表显充电量"
            min={0}
            max={99999999}
            value={electricConsume}
            onChange={(v) => setElectricConsume(v as number)}
          />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={compute}>
        计算
      </Button>
      <h4>结论：</h4>
      <p>{dom || '请填写日常纯电电耗、表显油耗'}</p>
    </div>
  );
}
export default Index;
