import { useEffect } from 'react';
import store from 'store/b-zustand';

function MyZustand() {
  console.log('zustand');
  useEffect(() => {
    // console.log(111,store.getState())
    // store.setState({ uid: 2 });
    // console.log(store.getState())
  }, []);
  // const bears = store((state) => state.uid);

  return (
    <div>
      {/* zustand{bears} */}
      123
    </div>
  );
}
export default MyZustand;
