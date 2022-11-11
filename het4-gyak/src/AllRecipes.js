import * as React from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { Container } from "@mui/system";
import { CircularProgress, Grid, Typography } from "@mui/material";
import useApi from "./useApi";

function AllRecipes() {
  const navigate = useNavigate();
  const [{recipes}, loading] = useApi('/all');

  const onNavigateToRecipe = (id) => {
    navigate(`/recipe/${id}`);
  }

  console.log(loading);
  if(loading) {
    return <CircularProgress/>;
  }

  return <Container maxWidth="lg">
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">All recipes</Typography>
      </Grid>
      {recipes?.map((recipe) => {
        return (<RecipeCard recipe={recipe} key={recipe?.id} onNavigateToRecipe={onNavigateToRecipe}></RecipeCard>)
      })}
    </Grid>
  </Container>
}

export default AllRecipes;