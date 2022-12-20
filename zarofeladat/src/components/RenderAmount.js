import { Typography } from '@mui/material';

export default function RenderAmount({ amount }) {
  if (amount < 0) {
    return <Typography color="red">{amount}</Typography>;
  }
  if (amount > 0) {
    return <Typography color="green">{amount}</Typography>;
  }
  return <Typography>{amount}</Typography>;
}
