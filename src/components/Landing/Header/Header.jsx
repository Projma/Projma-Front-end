import React from "react";
import Nav from "../Nav/Nav";
import "./Header.css";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import x from "../../../static/images/landing1.jpg";
const Header = () => {
  return (
    <header>
      <Nav />
      <div className="top-section">
        <div className="top-el top-el-1 top-el-img">
          <img src={x} />
        </div>
        <div className="top-el top-el-2">
          <Box
            sx={{
              marginRight: "20%",
              marginTop: "15%",
            }}
          >
            <h1>با پروجما کیفیت کار تیمی خود را ارتقا دهید</h1>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ marginX: 1 }}
            />
            <Button
              variant="contained"
              sx={{ height: 54, width: 150, fontSize: 17 }}
            >
              رایگان ثبت نام کنید
            </Button>
          </Box>
        </div>
      </div>
    </header>
  );
};

export default Header;

{
  /* <form>
            <div>
              <label for="exampleInputEmail1">ایمیل</label>
              <input
                type="email"
                className="email-inp"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="ایمیل خود را وارد کنید"
              />
              <small id="emailHelp" className="form-text text-muted">
                ما ایمیل شما را با هیچکس به اشتراک نخواهیم گذاشت
              </small>
              <button type="button" className="sign-up-btn">
                رایگان عضو شوید
              </button>
            </div>
          </form> */
}
