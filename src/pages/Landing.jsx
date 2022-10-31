import React from "react";
import Header from "../components/Landing/Header/Header";
import RecipeReviewCard from "../components/Landing/Card/ComplexInteraction";
import "../styles/Landing.css";
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

const Landing = () => {
  return (
    <div>
      <div>
      <Header />
      </div>
      <div  className="centered">
        {/* <Grid container alignItems="center" justifyItems="center" justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <RecipeReviewCard />
            </Grid>
          ))}
        </Grid> */}
        <RecipeReviewCard />
      </div>
    </div>
  );
};

export default Landing;
