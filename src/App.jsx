import { Outlet, useNavigate } from 'react-router-dom';
import './default.scss';
import { Search } from './google-library';

export default function App() {
  const navigate = useNavigate();
  return (
    <div className='App'>
      <div className='main'>
        <Search fullscreenMinSize={500} />
        <Outlet />
      </div>
    </div>
  );
}
