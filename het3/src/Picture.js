import { useState } from 'react';
import {
  // eslint-disable-next-line max-len
  Grid, Card, CardMedia, CardContent, CardActions, Button, Typography,
} from '@mui/material';
import SimpleDialog from './SimpleDialog';

function Picture({ title, imageUrl }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={6} md={12} lg={12}>
      <Card elevation={3}>
        <CardMedia component="img" height="250" image={imageUrl} />
        <CardContent><Typography variant="subtitle2">{title}</Typography></CardContent>
        <CardActions>
          <Button onClick={handleClickOpen}>Details</Button>
          <SimpleDialog open={open} onClose={handleClose} />
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Picture;
