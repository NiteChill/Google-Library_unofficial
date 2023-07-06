import { Outlet, useNavigate } from 'react-router-dom';
import './default.scss';
import { Search, FABs, Checkbox } from './google-library';

export default function App() {
  const navigate = useNavigate();
  return (
    <div className='App'>
      <div className='main'>
        <Search fullscreenMinSize={500} />
        <FABs />
        <Checkbox />
        <Outlet />
      </div>
    </div>
  );
}
