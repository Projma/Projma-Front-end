import React from "react";
import Header from "../components/Landing/Header/Header";
import RecipeReviewCard from "../components/Landing/Card/ComplexInteraction";
import "../styles/Landing.css";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import Footer from "../components/Landing/Footer/Footer";

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
      <Footer />
    </div>
  );
};

export default Landing;
