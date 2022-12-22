import { Chip, Grid } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';

export default function UserChip({
  id, name, walletData, handleAccessRemove,
}) {
  const { sessionUser } = useAuth();

  if (walletData.access.length === 1) {
    return <Grid item key={id}><Chip variant="outlined" label={name} /></Grid>;
  }
  if (sessionUser.name !== name && walletData.created_by.name === name) {
    return <Grid item key={id}><Chip variant="outlined" label={name} /></Grid>;
  }
  return <Grid item key={id}><Chip variant="outlined" label={name} onDelete={() => handleAccessRemove(name)} /></Grid>;
}
