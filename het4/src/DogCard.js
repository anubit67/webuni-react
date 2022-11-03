import {
  Card, CardMedia, CardContent, CardActions, Button, Typography, Grid,
} from '@mui/material';

function DogCard({
  name, url, id, onDelete,
}) {
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Card>
        <CardMedia component="img" image={url} height="150" />
        <CardContent>
          <Typography variant="h4">{name}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="error" fullWidth onClick={() => onDelete(id)}>delete</Button>
          <Button variant="contained" fullWidth>modify</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default DogCard;
