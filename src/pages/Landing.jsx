import React from "react";
import Header from "../components/Landing/Header/Header";
import RecipeReviewCard from "../components/Landing/Card/ComplexInteraction";
import "../styles/Landing.scss";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import Footer from "../components/Landing/Footer/Footer";
import good_team from "../static/images/landing/good_team.svg";
import software_engineer from "../static/images/landing/software_engineer.svg";
import team_up from "../static/images/landing/team_up.svg";
import our_solution from "../static/images/landing/our_solution.svg";
import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import co_working from "../static/images/landing/co_working.svg";
import product_iteration from "../static/images/landing/product_iteration.svg";
import team_collaboration from "../static/images/landing/team_collaboration.svg";
import time_management from "../static/images/landing/time_management.svg";
import { Helmet } from "react-helmet";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "../hooks/useTheme";

const Landing = () => {
  const matches = useMediaQuery("(min-width:450px)");
  const {theme, getColor} = useTheme();
  if (matches) {
    return (
      <div style={{overflow: "auto", maxHeight: "100vh", height: "100vh",maxWidth:"100vw",overflowX: "hidden"}}>
        <Helmet>
          <title>پروجما</title>
        </Helmet>
        <Header />
        <Container sx={{ marginTop: "10%", paddingTop: "0%" }}>
          <Grid container columns={{ xs: 2, sm: 4, md: 5 }}>
            <Grid
              item
              xs={2}
              sm={4}
              md={2}
            >
              <Box
                sx={{
                  padding: "20%",
                  color: getColor(theme.mainBg),
                  fontSize: "1.5rem",
                }}
              >
                <Typography variant="h6" component="div" gutterBottom style={{color: getColor(theme.mainBg)}}>
                  از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف
                  انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها
                  نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و
                  تیمتان را سردرگم می‌کند؟‎
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <img src={good_team} className="responsive--height top-img" />
            </Grid>
          </Grid>
  
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
  
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 5 }}
            sx={{
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <Grid item xs={2} sm={4} md={3}>
              <img
                src={software_engineer}
                className="responsive--height top-img"
              />
            </Grid>
            <Grid item xs={2} sm={4} md={2} sx={{}}>
              <Box
                sx={{
                  padding: "20%",
                  color: getColor(theme.mainBg),
                  fontSize: "1.5rem",
                }}
              >
                <Typography variant="h6" component="div" gutterBottom style={{color: getColor(theme.mainBg)}}>
                  از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف
                  انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها
                  نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و
                  تیمتان را سردرگم می‌کند؟‎
                </Typography>
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
                detail={detail1}
                title={title1}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <RecipeReviewCard
                image={product_iteration}
                text={text2}
                detail={detail2}
                title={title2}
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
                detail={detail4}
                title={title4}
              />
            </Grid>
          </Grid>
  
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 5 }}
            sx={{
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <Grid item xs={2} sm={4} md={2} sx={{}}>
              <Box
                sx={{
                  padding: "20%",
                  color: "white",
                  fontSize: "1.5rem",
                }}
              >
                <Typography variant="h6" component="div" gutterBottom style={{color: getColor(theme.mainBg)}}>
                  از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف
                  انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها
                  نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و
                  تیمتان را سردرگم می‌کند؟‎
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <img src={team_up} className="responsive--height top-img" />
            </Grid>
          </Grid>
  
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
  
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 5 }}
            sx={{
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <Grid item xs={2} sm={4} md={3} >
              <img src={our_solution} className="responsive--height top-img" />
            </Grid>
            <Grid item xs={2} sm={4} md={2} sx={{}}>
              <Box
                sx={{
                  padding: "20%",
                  color: "white",
                  fontSize: "1.5rem",
                }}
              >
                <Typography variant="h6" component="div" gutterBottom style={{color: getColor(theme.mainBg)}}>
                  از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف
                  انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها
                  نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و
                  تیمتان را سردرگم می‌کند؟‎
                </Typography>
              </Box>
            </Grid>
          </Grid>
  
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
        </Container>
        <Footer />
      </div>
    );
  }
  else {
    return (
      <div style={{overflow: "auto", maxHeight: "100vh", height: "100vh"}}>
        <Helmet>
          <title>پروجما</title>
        </Helmet>
        <Header />
        <Container sx={{ marginTop: "10%" }}>
          <Grid container columns={{ xs: 2, sm: 4, md: 5 }}>
            <Grid
              item
              xs={2}
              sm={4}
              md={2}
            >
              <Box
                sx={{
                  padding: "5%",
                  color: "white",
                  fontSize: "1.5rem",
                }}
              >
                <Typography variant="p" component="div" gutterBottom style={{color: getColor(theme.mainBg)}}>
                  از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف
                  انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها
                  نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و
                  تیمتان را سردرگم می‌کند؟‎
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <img src={good_team} className="responsive--height top-img" />
            </Grid>
          </Grid>
  
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
  
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 5 }}
            sx={{
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <Grid item xs={2} sm={4} md={3}>
              <img
                src={software_engineer}
                className="responsive--height top-img"
              />
            </Grid>
            <Grid item xs={2} sm={4} md={2} sx={{}}>
              <Box
                sx={{
                  padding: "5%",
                  color: "white",
                  fontSize: "1.5rem",
                }}
              >
                <Typography variant="p" component="div" gutterBottom style={{color: getColor(theme.mainBg)}}>
                  از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف
                  انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها
                  نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و
                  تیمتان را سردرگم می‌کند؟‎
                </Typography>
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
                detail={detail1}
                title={title1}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <RecipeReviewCard
                image={product_iteration}
                text={text2}
                detail={detail2}
                title={title2}
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
                detail={detail4}
                title={title4}
              />
            </Grid>
          </Grid>
  
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 5 }}
            sx={{
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <Grid item xs={2} sm={4} md={2} sx={{}}>
              <Box
                sx={{
                  padding: "5%",
                  color: "white",
                  fontSize: "1.5rem",
                }}
              >
                <Typography variant="p" component="div" gutterBottom style={{color: getColor(theme.mainBg)}}>
                  از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف
                  انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها
                  نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و
                  تیمتان را سردرگم می‌کند؟‎
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <img src={team_up} className="responsive--height top-img" />
            </Grid>
          </Grid>
  
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
  
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 5 }}
            sx={{
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <Grid item xs={2} sm={4} md={3} >
              <img src={our_solution} className="responsive--height top-img" />
            </Grid>
            <Grid item xs={2} sm={4} md={2} sx={{}}>
              <Box
                sx={{
                  padding: "5%",
                  color: "white",
                  fontSize: "1.5rem",
                }}
              >
                <Typography variant="p" component="div" gutterBottom style={{color: getColor(theme.mainBg)}}>
                  از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف
                  انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها
                  نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و
                  تیمتان را سردرگم می‌کند؟‎
                </Typography>
              </Box>
            </Grid>
          </Grid>
  
        </Container>
        <Footer />
      </div>
    );
  }
};

export default Landing;

const text3 = `پروجما به کمک امکانات گسترده خود، چون گزارش روزانه، دسته‌بندی کارها،
          تعیین ددلاین، ارتباطات درون تیمی مستمر و موثر به محیط کاری شما نظم
          بخشیده به تکمیل کارها و کنترل پروژه سرعت می‌بخشد. همچنین پروجما
          می‌تواند یک ابزار دورکاری بسیار مناسب برای مدیریت دورکاری تیم شما
          باشد.`;
const text1 =
  "همه چیز با یک تابلوی بصری شروع می شود - هسته سیستم عامل کار projma.ir. آن را به روش خود تنظیم کنید و هر چیزی را از پروژه ها گرفته تا بخش ها را مدیریت کنید.‎";
const text2 = `کار خود را ساده کنید
حداکثر بهره وری
تمام کارها، فرآیندها، ابزارها و فایل های خود را در یک سیستم عامل Work متمرکز کنید. تیم ها را به هم متصل کنید، سیلوها را پل کنید و یک منبع حقیقت را در سراسر سازمان خود حفظ کنید.‎
تیم ها را دور هم جمع کنید تا
تاثیر کسب و کار را هدایت کند
به طور مؤثر در سراسر سازمان همکاری کنید تا تصویر واضحی از همه کار خود داشته باشید. با اتوماسیون‌های آسان و اعلان‌های هم‌زمان در جریان باشید.‎`;
const text4 =
  "از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و تیمتان را سردرگم می‌کند؟‎";
const detail1 = `مدیریت پروژه (به انگلیسی: Project management) تخصیص، پیگیری و کاربرد منابع برای رسیدن به اهداف مشخص در یک دوره زمانی خاص را مدیریت پروژه می‌گویند.[۱] به بیان دیگر مدیریت پروژه به‌کارگیری دانش، مهارت‌ها، ابزارها و تکنیک‌ها برای فعالیت‌های پروژه به منظور تحقق الزامات پروژه است. مدیریت پروژه با استفاده از فرآیندهایی هم‌چون فرآیندهای آغازین، برنامه‌ریزی، اجرایی، پایشی و اختتامی انجام می‌پذیرد.[۲] از طرف دیگر می‌توان مدیریت پروژه را شامل قوانینی دانست که برای شروع، برنامه‌ریزی، اجرا، کنترل و خاتمه کار یک تیم برای دستیابی به اهداف خاص و برآورده کردن معیارهای موفقیت مشخص لازم هستند.`;
const detail2 = `یک پروژه منحصر به فرد و غیرتکراری است و بنابراین یک کار معمولی و روتین نیست. بلکه مجموعهٔ از عملیات است که برای دستیابی به یک هدف واحد طراحی شده‌است؛ بنابراین یک تیم پروژه معمولاً شامل افرادی است که به‌طور معمول با هم کار نمی‌کنند، بعضی اوقات از سازمان‌ها و حتی چندین جغرافیای مختلف هستند.`;
const detail3 = `فرآیندی است در جهت حفظ مسیر پروژه، برای دستیابی به تعادلی اقتصادی و موجه، بین سه عامل هزینه، زمان و کیفیت، در حین اجرای پروژه، که از ابزار و تکنیک‌های خاص خود، در انجام این مهم کمک می‌گیرد. در واقع کنترل اجرای دقیق و کامل برنامه تدوین شده برای پروژه است، به‌طوری‌که هنگام خروج از برنامه بتوان با تشخیص علل و طرح اقتصادی‌ترین فعالیت‌ها، پروژه را به نزدیک‌ترین حالت ممکن در مسیر اولیه و اصلی خود بازگرداند. کنترل پروژه در این راه از سه عامل زیر بهره می‌گیرد.`;
const detail4 = `منظور آموزش برای انجام فعالیت‌های آماده‌سازی، نظارت و اجرای پروژه به ویژه پروژه‌های عمرانی طرح‌ریزی شده‌است. ویژگی اصلی تخصصی مهندسی مدیریت پروژه، ماهیت بین رشته‌ای آن است. این رشته تلفیقی از رشته‌های عمران، صنایع و مدیریت می‌باشد.

برای مدیریت پروژه روش‌های و طرح‌های بسیاری وجود دارد که بسته به نوع پروژه و شرایط ویژه آن اتخاذ می‌شود نحوه مدیریت پروژه تأثیر مستقیمی بر رسیدن به اهداف آن دارد.

هر چند که رویکرد مدیریت پروژه یک رویکرد کاملاً اقتضایی است اما با فرموله کردن موضوع می‌توان از درست بودن تصمیم‌های گرفته شده اطمینان حاصل کرد.`;
const title1 = `پروجما`;
const title2 = `پروجما`;
const title3 = `پروجما`;
const title4 = `پروجما`;