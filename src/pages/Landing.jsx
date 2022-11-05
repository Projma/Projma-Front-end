import React from "react";
import Header from "../components/Landing/Header/Header";
import RecipeReviewCard from "../components/Landing/Card/ComplexInteraction";
import "../styles/Landing.css";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import Footer from "../components/Landing/Footer/Footer";
import x from "../static/images/cards/paella.jpg";

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
            <RecipeReviewCard
              image={x}
              text={text3}
              detail={detail3}
              title={title3}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Landing;
const text3 = `تسکولو به کمک امکانات گسترده خود، چون گزارش روزانه، دسته‌بندی کارها،
          تعیین ددلاین، ارتباطات درون تیمی مستمر و موثر به محیط کاری شما نظم
          بخشیده به تکمیل کارها و کنترل پروژه سرعت می‌بخشد. همچنین تسکولو
          می‌تواند یک ابزار دورکاری بسیار مناسب برای مدیریت دورکاری تیم شما
          باشد.`;

const detail3 = `جزئیات`;
const title3 = `پروژما`;
