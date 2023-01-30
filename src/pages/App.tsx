import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from 'routes';
import SDK from 'sdk';
new SDK({ logUrl: '/report', captureError: true, resourceTiming: true, elementTiming: true });
function App() {
  const AppRoute = () => useRoutes(routes);
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}
App.whyDidYouRender = true;
export default App;
