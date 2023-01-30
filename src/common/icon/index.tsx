import './iconfont.css';
import './index.css';
interface IconProps {
  className?: string;
  style?: Record<string, string>;
  onClick?: () => void;
}
const Index = (props: IconProps) => {
  return (
    <i
      className={`iconfont small ${props.className}`}
      style={props.style}
      onClick={props.onClick}
    ></i>
  );
};
export default Index;
