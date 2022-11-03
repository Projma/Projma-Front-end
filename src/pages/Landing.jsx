import React from "react";
import Header from "../components/Landing/Header/Header";
import RecipeReviewCard from "../components/Landing/Card/ComplexInteraction";
import "../styles/Landing.css";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";

const Landing = () => {
  return (
    <div>
      <Header />
      <Container sx={{ marginTop: "10%" }}>
        <Grid
          container
          spacing={{ xs: 1, md: 10, sm: 5 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard />
          </Grid>
        </Grid>
      </Container>
      {/* <Grid container alignItems="center" justifyItems="center" justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <RecipeReviewCard />
            </Grid>
          ))}
        </Grid> */}
    </div>
  );
};

export default Landing;
