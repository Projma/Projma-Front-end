import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { convertNumberToPersian } from "../../../../../../utilities/helpers";
import useTheme from "../../../../../../hooks/useTheme";

const CardFooter = ({
  doers,
  attachments_num,
  checklists_num,
  checked_checklists_num,
  comments_num,
}) => {
  const {theme, getColor} = useTheme();
  return (
    <>
      {(attachments_num !== 0 ||
        checklists_num !== 0 ||
        comments_num !== 0 ||
        doers.length !== 0) && (
        <div className="card_footer">
          {doers.length !== 0 && (
            <div className="card_card-avatar">
              <AvatarGroup
                max={5}
                sx={{ direction: "ltr", border: "none" }}
                className="card_avatar-container"
              >
                {doers.map((x) => (
                  <Tooltip title={x.first_name + " " + x.last_name}>
                    <Avatar
                      key={crypto.randomUUID()}
                      alt={x.first_name + " " + x.last_name}
                      src={x.profile_pic !== null ? x.profile_pic : "none"}
                      sx={{color: getColor(theme.secondary), backgroundColor: theme.secondary}}
                      className="card_avatar-profile-picture"
                    >
                      {(x.first_name[0] + x.last_name[0]).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            </div>
          )}
          {(attachments_num !== 0 ||
            checklists_num !== 0 ||
            comments_num !== 0) && (
            <div className="card_footer-icon">
              {attachments_num !== 0 && attachments_num !== undefined && (
                <div className="card_icon-container">
                  <AttachFileIcon className="card_default-footer-icon" />
                  <p className="card_icon-info">
                    {convertNumberToPersian(attachments_num)}
                  </p>
                </div>
              )}
              {checklists_num !== 0 && checklists_num !== undefined && (
                <div>
                  {checked_checklists_num === checklists_num ? (
                    <div className="card_icon-container">
                      <CheckBoxOutlinedIcon className="card_default-footer-icon card_checklist-finish" />
                      <p className="card_icon-info ">
                        {convertNumberToPersian(checked_checklists_num)} /
                        {convertNumberToPersian(checklists_num)}
                      </p>
                    </div>
                  ) : (
                    <div className="card_icon-container">
                      <CheckBoxOutlinedIcon className="card_default-footer-icon" />
                      <p className="card_icon-info">
                        {convertNumberToPersian(checked_checklists_num)}/
                        {convertNumberToPersian(checklists_num)}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {comments_num !== 0 && comments_num !== undefined && (
                <div className="card_icon-container">
                  <ChatBubbleIcon className="card_default-footer-icon" />
                  <p className="card_icon-info">
                    {convertNumberToPersian(comments_num)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CardFooter;
