import { Typography } from '@mui/material';

export const DISPLAY_INLINE_FLEX = { display: 'inline-flex' };
export const DISPLAY_NONE = { display: 'none' };

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

export const usermameValidator = (value) => {
  const pattern = /^[a-zA-Z0-9]/;
  if (!value) {
    return 'Username must be given';
  }
  if (value.length < 3) {
    return 'Username must be atleast 3 characters';
  }
  if (value.length > 20) {
    return 'Username can be maximum 20 characters';
  }
  if (!pattern.test(value)) {
    return 'Username should have only lowercase, uppercase and numbers';
  }
  return '';
};

export const passwordValidator = (value) => {
  const pattern = /(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+).*/;
  if (!value) {
    return 'Password must be given';
  }
  if (value.length < 5) {
    return 'Password must be atleast 5 character';
  }
  if (!pattern.test(value)) {
    return 'Password must have atleast 1 lowercase 1 uppercase and one number';
  }
  return '';
};

export const passwordAgainValidator = (values) => {
  const { password1, password2 } = values;
  if (password1 !== password2) {
    return { password2: 'The passwords do not match' };
  }
  return '';
};
