import React from "react";
import Header from "../components/Landing/Header/Header";
import RecipeReviewCard from "../components/Landing/Card/ComplexInteraction";
import "../styles/Landing.css";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import Footer from "../components/Landing/Footer/Footer";
import x from "../static/images/cards/paella.jpg";
import good_team from "../static/images/landing/good_team.svg";
import software_engineer from "../static/images/landing/software_engineer.svg";
import team_up from "../static/images/landing/team_up.svg";
import our_solution from "../static/images/landing/our_solution.svg";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import co_working from "../static/images/landing/co_working.svg";
import product_iteration from "../static/images/landing/product_iteration.svg";
import team_collaboration from "../static/images/landing/team_collaboration.svg";
import time_management from "../static/images/landing/time_management.svg";

const Landing = () => {
  return (
    <div>
      <Header />
      <Container sx={{ marginTop: "10%" }}>

        <Grid
          container
          columns={{ xs: 2, sm: 4, md: 5 }}
        >
          <Grid
            item
            xs={2}
            sm={4}
            md={2}
            sx={{
              // background: "#076585" /* fallback for old browsers */,
              // background: "-webkit-linear-gradient(to right, #076585, #fff)",
              // background: "linear-gradient(to right, #076585, #fff)",
            }}
          >
            <Box
              sx={{
                padding: "20%",
                color: "white",
                fontSize: "1.5rem",
              }}
            >
              از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و تیمتان را سردرگم می‌کند؟‎
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            <img src={good_team} className="responsive--height top-img" />
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: "white",marginTop: "5%" }}/>

        <Grid
          container
          columns={{ xs: 2, sm: 4, md: 5, }}
          sx={{
            marginTop: "10%",
            marginBottom: "10%",
          }}
        >
          <Grid item xs={2} sm={4} md={3}>
            <img src={software_engineer} className="responsive--height top-img" />
          </Grid>
          <Grid
            item
            xs={2}
            sm={4}
            md={2}
            sx={{
            }}
          >
            <Box
              sx={{
                padding: "20%",
                color: "white",
                fontSize: "1.5rem",
              }}
            >
              از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و تیمتان را سردرگم می‌کند؟‎
            </Box>
          </Grid>
        </Grid>
        

        <Grid
          container
          spacing={{ xs: 1, md: 10, sm: 5 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard 
              image={co_working}
              text={text1}
              detail={detail3}
              title={title3}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard 
              image={product_iteration}
              text={text2}
              detail={detail3}
              title={title3}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard 
              image={team_collaboration}
              text={text3}
              detail={detail3}
              title={title3}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <RecipeReviewCard
              image={time_management}
              text={text4}
              detail={detail3}
              title={title3}
            />
          </Grid>
        </Grid>


        <Grid
          container
          columns={{ xs: 2, sm: 4, md: 5, }}
          sx={{
            marginTop: "10%",
            marginBottom: "10%",
          }}
        >
          <Grid
            item
            xs={2}
            sm={4}
            md={2}
            sx={{
            }}
          >
            <Box
              sx={{
                padding: "20%",
                color: "white",
                fontSize: "1.5rem",
              }}
            >
              از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و تیمتان را سردرگم می‌کند؟‎
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            <img src={team_up} className="responsive--height top-img" />
          </Grid>
        </Grid>
        
        <Divider sx={{ bgcolor: "white",marginTop: "5%" }}/>

        <Grid
          container
          columns={{ xs: 2, sm: 4, md: 5, }}
          sx={{
            marginTop: "10%",
            marginBottom: "10%",
          }}
        >
          <Grid item xs={2} sm={4} md={3}>
            <img src={our_solution} className="responsive--height top-img" />
          </Grid>
          <Grid
            item
            xs={2}
            sm={4}
            md={2}
            sx={{
            }}
          >
            <Box
              sx={{
                padding: "20%",
                color: "white",
                fontSize: "1.5rem",
              }}
            >
              از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و تیمتان را سردرگم می‌کند؟‎
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ bgcolor: "white",marginTop: "5%" }}/>

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
const text1 = 'همه چیز با یک تابلوی بصری شروع می شود - هسته سیستم عامل کار monday.com. آن را به روش خود تنظیم کنید و هر چیزی را از پروژه ها گرفته تا بخش ها را مدیریت کنید.‎';
const text2 = `کار خود را ساده کنید
حداکثر بهره وری
تمام کارها، فرآیندها، ابزارها و فایل های خود را در یک سیستم عامل Work متمرکز کنید. تیم ها را به هم متصل کنید، سیلوها را پل کنید و یک منبع حقیقت را در سراسر سازمان خود حفظ کنید.‎
تیم ها را دور هم جمع کنید تا
تاثیر کسب و کار را هدایت کند
به طور مؤثر در سراسر سازمان همکاری کنید تا تصویر واضحی از همه کار خود داشته باشید. با اتوماسیون‌های آسان و اعلان‌های هم‌زمان در جریان باشید.‎`;
const text4 = 'از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و تیمتان را سردرگم می‌کند؟‎'
const detail3 = `جزئیات`;
const title3 = `پروژما`;



