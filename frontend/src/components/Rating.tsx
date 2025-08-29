import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // You may need to install react-icons

interface RatingProps {
  value: number;
  text?: string;
}

const Rating: React.FC<RatingProps> = ({ value, text }) => {
  // First, install react-icons: npm install react-icons
  return (
    <div className="rating">
      <span>
        {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
      <span>
        {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
      <span>
        {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
      <span>
        {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
      <span>
        {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;