import React, { useEffect, useState } from "react";
import { convertNumberToPersian } from "../../../../../../utilities/helpers";
import CardCover from "./Content/CardCover";
import CardTitle from "./Content/CardTitle";
import CardLabel from "./Content/CardLabel";
import apiInstance from "../../../../../../utilities/axiosConfig";
import useTheme from "../../../../../../hooks/useTheme";

const CardBody = ({ title, labels, cardId }) => {
  const [show, setShow] = useState(false);
  const [enable, setEnable] = useState(false);
  const [cover, setCover] = useState("");
  const {theme, getColor} = useTheme();
  const getCover = async () => {
    await apiInstance.get(`task/${cardId}/get-task/`).then((response) => {
      let attach = response.data.attachments;
      let pic = "";
      if (attach !== undefined) {
        attach.every((x) => {
          let file = x.file.split("attachments/")[1];
          file = file.split(".")[1];
          if (file === "png" || file === "jpeg" || file === "jpg") {
            pic = x.file;
            return true;
          }
          return false;
        });
        setCover(pic);
      }
      console.log(pic);
    });
  };
  
  useEffect(() => {
    getCover();
  },[]);

  return (
    <>
      <div className="card_body" style={{color:getColor(theme.minorBg)}}>
        {cover !== "" && cover !== undefined && (
          <div className="card_cover">
            <CardCover src={cover}/>
          </div>
        )}
        <div
          className="card_title"
          onClick={(event) => {
            if (enable) event.stopPropagation();
          }}
        >
          {show ? (
            <CardTitle enable={enable} title={convertNumberToPersian(title)} />
          ) : (
            <p>{convertNumberToPersian(title)}</p>
          )}
        </div>
      </div>
      {labels.length !== 0 && (
        <div className="card_label">
          <CardLabel label={labels} />
        </div>
      )}
    </>
  );
};

export default CardBody;
