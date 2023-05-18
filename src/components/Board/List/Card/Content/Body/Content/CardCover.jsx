import './CardCover.css';

const CardCover = ({src}) => {
  return (
    <div className="card-item_cover">
      <img
        className="card-item_picture"
        src={src}
        alt="تصویر پس زمینه کارت"
      />
    </div>
  );
};

export default CardCover;
