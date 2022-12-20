import { useAuth } from '../../hooks/useAuth';
import WalletsScreen from './WalletsScreen';

export default function MyWalletsScreen() {
  const { sessionUser } = useAuth();

  return (
    <WalletsScreen filterBy={(d) => d.created_by.name === sessionUser.name} />
  );
}
