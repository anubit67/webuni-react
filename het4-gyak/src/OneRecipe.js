import { Button, Container, Grid, Typography, CircularProgress } from "@mui/material";
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "./useApi";

function OneRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [{ recipe }, loading] = useApi(`/recipe/${id}`);

  if(loading) {
    return <CircularProgress/>;
  }

  return (
  <Container maxWidth="lg">
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">{recipe?.name}</Typography>
        <img src={recipe?.image} alt={recipe?.name}/>
        <Typography variant="h4">Ingredients</Typography>
        <ul>
          {recipe?.ingredients?.map((item, idx) => {
            return <li key={idx}>{item}</li>
          })}
        </ul>
        <Typography variant="h4">Instructions</Typography>
        <Typography variant="body1">{recipe?.instructions}</Typography>
          <Button variant={"contained"} fullWidth onClick={() => {
          navigate(`/`)
        }}>back to all AllRecipes</Button>
      </Grid>
    </Grid>
  </Container>)
}

export default OneRecipe;