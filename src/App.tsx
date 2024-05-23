import { RouterProvider, createBrowserRouter, useLocation, Navigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { BarcodeReaderPage } from './pages/BarcodeReader';
import { QrCodeGeneratorPage } from './pages/QrCodeGenerator';
import { HomePage } from './pages/Home';
import { GoBackButton } from './components/GoBackButton';

interface RouteHandlerProps {
  to: string
}

export const RouteHandler = ({ to }: RouteHandlerProps) => {
  const prevRoute = useLocation()
  return <Navigate to={to} state={{ prevRoute }} replace />
}

const App = () => {
  const router = createBrowserRouter([
    {
      path: RoutePaths.Generate, 
      element: 
        <>
          <GoBackButton />
          <QrCodeGeneratorPage />
        </>
    },
    {
      path: RoutePaths.Scan, 
      element: 
        <>
          <GoBackButton />
          <BarcodeReaderPage />
        </>
    },
    {
      path: RoutePaths.Home, 
      element: 
        <>
          <HomePage />
        </>
    },
    {
      path: "*", 
      element: 
        <>
          <RouteHandler to={RoutePaths.Home} />
        </>
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
