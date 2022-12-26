import * as React from 'react';
import './styles/CardLabel.css';

const CardLabel = ({ label }) => {
  console.log(label);
  return (
    <>
      {label !== undefined && <div className="card-item_label">
        {label.map((l) => (
          <div className="card-item_label-container"
               style={{ backgroundColor: (l.color === '#ffffff' || l.color === '#000000' || l.color === '#fff' || l.color === '#000') ? '#66666644' : l.color + '44' }}>
            <spans style={{
              color: l.color,
            }}>{l.title}</spans>
          </div>
        ))}
      </div>}
    </>
  );
};

export default CardLabel;
