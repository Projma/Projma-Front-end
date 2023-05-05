import React from "react";
import "./Discuss.scss";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import { convertNumberToPersian, convertNumberToEnglish } from "../../../utilities/helpers";
import GroupAvatars from "../../Board/temp/GroupAvatars/GroupAvatars";
import { useParams } from "react-router-dom";

const Discuss = () => {

    const { boardId } = useParams();

    return (
        <div style={{
            width: '100%',
        }}>
            <div className="discuss-header">
                <div className="discuss-header-right">
                <div>
                    <span className="discuss-header-right-title">نام بورد:</span>
                    <span className="discuss-header-right-title"> </span>
                    {/* <span className="discuss-header-right-title">{ boardName }</span> */}
                </div>
                <div>
                    <span className="discuss-header-right-subtitle">توضیحات بورد:</span>
                    <span className="discuss-header-right-subtitle"> </span>
                    {/* <span className="discuss-header-right-subtitle"> {BoardDescription}</span> */}
                </div>
                </div>
                <div className="discuss-header-left">
                    <GroupAvatars boardId={boardId} />
                </div>
            </div>
            <p className="header_text">
            بحث و گفت‌و‌گو
            </p>
            <p className="paragraph">
            برای ثبت گام‌های بعدی، کارت‌های کاری آماده تهیه کنید.
            </p>
            <div className="discuss-topic">
                    <span className="discuss-topic-item">
                        <span className="discuss-topic-item-title">"</span>
                        <span className="discuss-topic-item-title">کم کاری ممد</span>
                        <span className="discuss-topic-item-title">"</span>
                        <span className="discuss-topic-item-title"> </span>
                        <span className="discuss-topic-item-like">
                            <ThumbUpTwoToneIcon className="discuss-topic-item-like-icon" />
                            <span className="discuss-topic-item-like-number">{convertNumberToPersian(10)}</span>
                        </span>
                    </span>
            </div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} className="discuss-paper">
                            <Box className="discuss-box">
                                <h3 className="discuss-title">نظرات کاربران</h3>
                                <Divider className="discuss-divider" />
                                <div className="discuss-content">
                                    <div className="discuss-content-item">
                                        <div className="discuss-content-item-title">
                                            <span>نظر کاربر</span>
                                            <span>تاریخ</span>
                                            <span>امتیاز</span>
                                        </div>
                                    </div>
                                    <div className="discuss-content-item-content">
                                        <span>متن نظر کاربر</span>
                                        <span>تاریخ</span>
                                        <span>امتیاز</span>
                                    </div>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} className="discuss-paper">
                            <Box className="discuss-box">
                                <h3 className="discuss-title">ثبت نظر</h3>
                                <Divider className="discuss-divider" />
                                <div className="discuss-content">
                                    <div className="discuss-content-item">
                                        <div className="discuss-content-item-title">
                                            <span>نام</span>
                                            <span>ایمیل</span>
                                            <span>امتیاز</span>
                                        </div>
                                        <div className="discuss-content-item-content">
                                            <input type="text" placeholder="نام" />
                                            <input type="email" placeholder="ایمیل" />
                                            <input type="number" placeholder="امتیاز" />
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Discuss;