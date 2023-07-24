import * as React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./BasicModal.scss";
import scrum_board from "../../../static/images/dashboard/scrum_board.svg";
import Grid from "@mui/material/Grid"; // Grid version 1
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiInstance from "../../../utilities/axiosConfig";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../../utilities/helpers";
import useTheme from "../../../hooks/useTheme";

export default function BasicModal(props) {
  const { theme, getColor } = useTheme();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "78%",
    // bgcolor: 'background.paper',
    bgcolor: theme.secondary, // #5090D3 #1E4976 001E3C 007fff 265D97
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    fontFamily: "Vazir",
    overflow: "auto",
    color: getColor(theme.secondary),
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let width = window.innerWidth;
  let isMatch = width > 900 ? true : false;
  const types = [
    {
      value: "education",
      label: "آموزشی",
    },
    {
      value: "marketing",
      label: "بازاریابی",
    },
    {
      value: "small business",
      label: "سرمایه گذاری کوچک",
    },
    {
      value: "operations",
      label: "عملیاتی",
    },
    {
      value: "engineering-it",
      label: "مهندسی و IT",
    },
    {
      value: "finance",
      label: "مالی",
    },
    {
      value: "human resources",
      label: "منابع انسانی",
    },
    {
      value: "other",
      label: "سایر",
    },
  ];
  const [type, setType] = React.useState("");
  const [disableButton, setDisableButton] = React.useState(false);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const [errorWorkspaceName, setErrorWorkspaceName] = React.useState(false);
  const [errorWorkspaceType, setErrorWorkspaceType] = React.useState(false);

  const navigate = useNavigate();

  const navigateToWorkspace = (workspaceId) => {
    navigate(`/workspace/${workspaceId}/dashboard/board`);
  };

  return (
    <>
      {props.text === "+" && (
        <Button
          onClick={handleOpen}
          sx={{
            ":hover": {
              color: getColor(theme.tertiary),
              backgroundColor: theme.tertiary,
              borderRadius: "5px",
            },
            transition: "0.3s",
            backgroundColor: theme.minorBg,
            color: getColor(theme.mainBg),
            marginTop: "8%",
            padding: "5%",

            fontFamily: "Vazir",
            textDecoration: "none",
            display: "block",
            transition: "0.3s",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2>+</h2>
        </Button>
      )}

      {props.text === "ایجاد فضای کاری جدید" && (
        <Button
          onClick={handleOpen}
          sx={{
            color: "#000",
            ":hover": {
              color: getColor(theme.tertiary),
              backgroundColor: theme.tertiary,
              borderRadius: "5px",
            },
            transition: "0.3s",
            backgroundColor: theme.minorBg,
            color: getColor(theme.mainBg),
            // marginTop: '8%',
            // padding: '10%',
            fontFamily: "Vazir",
            textDecoration: "none",
            display: "block",
            transition: "0.3s",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "87%" }} className="text-in-button">
            {props.text}
          </div>
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container columns={{ xs: 3, sm: 3, md: 6 }}>
            <Grid item xs={3} sm={3} md={3}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontFamily: "Vazir",
                  color: getColor(theme.minorBg), // #0A1929
                  fontSize: "215%",
                }}
                className="neonText"
              >
                بیا فضای کاریمون رو بسازیم
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 2,
                  fontFamily: "Vazir",
                  color: getColor(theme.minorBg),
                  fontSize: "142%",
                  marginBottom: "7%",
                }}
              >
                بهره وری خود را با آسان کردن دسترسی همه به بوردها در یک مکان
                افزایش دهید.
              </Typography>

              <Box
                sx={{
                  // padding: "10%",
                  fontFamily: "Vazir",
                  fontSize: "1.5rem",
                }}
              >
                <PerTextField>
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="workspace_name"
                    label="نام فضای‌کاری"
                    // placeholder="نام فضای‌کاری خود را وارد کنید."
                    // helperText="این نام شرکت، تیم یا سازمان شما است."
                    name="workspace_name"
                    autoComplete="workspace_name"
                    autoFocus
                    sx={{ width: "60%", display: "block" }}
                    InputLabelProps={{
                      style: {
                        fontFamily: "Vazir",
                        fontSize: "85%",
                        color: getColor(theme.minorBg),
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "Vazir",
                        color: getColor(theme.minorBg),
                        fontSize: "110%",
                      },
                    }}
                    FormHelperTextProps={{
                      style: {
                        fontFamily: "Vazir",
                        color: getColor(theme.minorBg),
                        fontSize: "80%",
                      },
                    }}
                    error={errorWorkspaceName}
                    helperText={
                      errorWorkspaceName
                        ? "نام فضای کار نمی‌تواند خالی باشد."
                        : "* این نام شرکت، تیم یا سازمان شما است."
                    }
                    onChange={(e) => {
                      document.getElementById("workspace_name").value =
                        convertNumberToPersian(e.target.value);
                    }}
                  />

                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="workspace_type"
                    label="نوع فضای کاری"
                    select // https://mui.com/material-ui/react-text-field/#basic-textfield
                    placeholder="نوع فضای‌کاری خود را وارد کنید."
                    // helperText="انتخاب کنید."
                    onChange={handleChange}
                    name="workspace_type"
                    autoComplete="workspace_type"
                    autoFocus
                    sx={{
                      width: "60%",
                      display: "block",
                      marginTop: "5%",
                      ".MuiSvgIcon-root": {
                        fill: theme.primary,
                        marginLeft: "0.5rem",
                      },
                      ".MuiFormHelperText-root": {
                        color: getColor(theme.minorBg),
                        fontSize: "1rem",
                      },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "Vazir", fontSize: "85%" },
                    }}
                    InputProps={{
                      style: { fontFamily: "Vazir", fontSize: "95%" },
                    }}
                    FormHelperTextProps={{
                      style: { fontFamily: "Vazir", color: "black" },
                    }}
                    error={errorWorkspaceType}
                    helperText={
                      errorWorkspaceType ? "لطفا این فیلد را پر کنید." : ""
                    }
                  >
                    {types.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{
                          fontFamily: "Vazir",
                          color: getColor(theme.minorBg), // #0A1929
                          backgroundColor: theme.minorBg,
                          margin: "0%",
                          padding: "3%",
                          fontSize: "140%",
                        }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </StyledTextField>
                  <StyledTextField
                    margin="normal"
                    fullWidth
                    multiline
                    maxRows={4}
                    id="workspace_description"
                    label="شرح فضای کاری (اختیاری)  "
                    // placeholder="شرح فضای‌کاری خود را وارد کنید."
                    helperText="* اعضای خود را با چند کلمه در مورد فضای کاری خود همراه کنید."
                    name="workspace_description"
                    autoComplete="workspace_description"
                    autoFocus
                    sx={{ width: "60%", display: "block", marginTop: "5%" }}
                    InputLabelProps={{
                      style: { fontFamily: "Vazir", fontSize: "85%" },
                    }}
                    InputProps={{
                      style: { fontFamily: "Vazir", fontSize: "110%" },
                    }}
                    FormHelperTextProps={{
                      style: {
                        fontFamily: "Vazir",
                        color: getColor(theme.minorBg),
                        fontSize: "77%",
                      },
                    }}
                    onChange={(e) => {
                      document.getElementById("workspace_description").value =
                        convertNumberToPersian(e.target.value);
                    }}
                  />
                </PerTextField>
                <Button
                  variant="contained"
                  sx={{
                    // height: 54,
                    // width: 150,
                    // fontSize: "90%",
                    width: "60%",
                    height: "100%",
                    fontFamily: "Vazir",
                    marginTop: "5%",
                  }}
                  disabled={disableButton}
                  // onClick={this.isClicked}
                  onClick={() => {
                    let workspace_name =
                      document.getElementById("workspace_name").value;
                    let isValid = true;
                    if (workspace_name === "") {
                      setErrorWorkspaceName(true);
                      isValid = false;
                    } else {
                      setErrorWorkspaceName(false);
                    }
                    if (type == "") {
                      setErrorWorkspaceType(true);
                      isValid = false;
                    } else {
                      setErrorWorkspaceType(false);
                    }
                    if (isValid === false) {
                      return;
                    } else {
                      setDisableButton(true); // make text spinning and disable button
                    }

                    let create_workspace_formdata = new FormData();
                    create_workspace_formdata.append("name", workspace_name);
                    create_workspace_formdata.append("type", type);
                    create_workspace_formdata.append(
                      "description",
                      document.getElementById("workspace_description").value
                    );
                    // ////console.log(create_workspace_formdata);
                    // ////console.log("clicked");
                    apiInstance
                      .post(
                        "workspaces/dashboard/create-workspace/",
                        create_workspace_formdata
                      )
                      .then((response) => {
                        navigateToWorkspace(response.data.id);
                      })
                      .catch((error) => {
                        ////console.log(error);
                      });
                  }}
                >
                  {" "}
                  ادامه
                </Button>
              </Box>
              {/* توصیف فضای کاری خود را وارد کنید (دلخواه) */}
            </Grid>
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
                alignItems: "center",
                alignContent: "center",
                // paddingTop: isMatch ? '11%' : '0%',
                paddingTop: "11%",
              }}
            >
              <img src={scrum_board} className="responsive--height top-img" />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
