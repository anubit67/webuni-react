import { Typography } from '@mui/material';

export function renderAmount(a) {
  if (a < 0) {
    return <Typography color="red">{a}</Typography>;
  }
  if (a > 0) {
    return <Typography color="green">{a}</Typography>;
  }
  return <Typography>{a}</Typography>;
}

export function formatDate(dateString) {
  return new Date(dateString).toUTCString();
}

export function sortByDate(a, b) {
  if (a.created_at > b.created_at) {
    return -1;
  }
  if (a.created_at < b.created_at) {
    return 1;
  }
  return 0;
}

export function validator(value) {
  if (!value && value.length === 0) {
    return 'Field must not be empty';
  }
  return '';
}
