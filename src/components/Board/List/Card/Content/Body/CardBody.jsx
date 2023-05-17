import React, { useState } from "react";
import { convertNumberToPersian } from "../../../../../../utilities/helpers";
import CardCover from "./Content/CardCover";
import CardTitle from "./Content/CardTitle";
import CardLabel from "./Content/CardLabel";

const CardBody = ({cover,title,labels}) => {
  const [show, setShow] = useState(false);
  const [enable, setEnable] = useState(false);
  // const [insideButton, setInsideButton] = useState(false);

  // const handleEditCardName = (e) => {
  //   e.stopPropagation();
  //   setShow(!show);
  //   setInsideButton(true);
  //   setEnable(!enable);
  // };

  return (
    <>
      <div className="card_body">
        {cover !== "" && cover !== undefined && (
          <div className="card_cover">
            <CardCover src={cover} />
          </div>
        )}
        <div
          className="card_title"
          onClick={(event) => {
            if (enable) event.stopPropagation();
          }}
        >
          {show ? (
            <CardTitle
              enable={enable}
              title={convertNumberToPersian(title)}
            />
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
