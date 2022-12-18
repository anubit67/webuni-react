import { Chip, Grid } from '@mui/material';

export default function UserChip({
  id, name, walletData, handleAccessRemove,
}) {
  if (walletData.access.length === 1) {
    return <Grid item key={id}><Chip variant="outlined" label={name} /></Grid>;
  }
  if (walletData.created_by.name === name) {
    return <Grid item key={id}><Chip variant="outlined" label={name} /></Grid>;
  }
  return <Grid item key={id}><Chip variant="outlined" label={name} onDelete={() => handleAccessRemove(name)} /></Grid>;
}
