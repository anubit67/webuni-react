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

export function basicValidator(value) {
  if (!value && value.length === 0) {
    return 'Field must not be empty';
  }
  return '';
}

export function numberValidator(value) {
  if (!value && value.length === 0) {
    return 'Field must not be empty';
  }
  if (Number.isNaN(Number(value))) {
    return 'Value must be a number';
  }
  return '';
}
