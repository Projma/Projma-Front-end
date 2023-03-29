import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { convertNumberToPersian } from "../../../../../../utilities/helpers";

const CardFooter = ({
  doers,
  attachments_num,
  checklists_num,
  checked_checklists_num,
  comments_num,
}) => {
  return (
    <>
      <div className="card_footer">
        <div className="card_card-avatar">
          {doers !== [] && (
            <AvatarGroup
              max={5}
              spacing="-1"
              sx={{ direction: "ltr", border: "none" }}
              className="card_avatar-container"
            >
              {doers.map((x) => (
                <Tooltip title={x.first_name + " " + x.last_name}>
                  <Avatar
                    key={crypto.randomUUID()}
                    alt={x.first_name + " " + x.last_name}
                    src={x.profile_pic !== null ? x.profile_pic : "none"}
                    {...stringAvatar(x.first_name + " " + x.last_name)}
                    className="card_avatar-profile-picture"
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          )}
        </div>
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
      </div>
    </>
  );
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0].toUpperCase()}${name
      .split(" ")[1][0]
      .toUpperCase()}`,
  };
}

export default CardFooter;
