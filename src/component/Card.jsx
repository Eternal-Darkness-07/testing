import './Card.css'; // Ensure this CSS file is included for styling

const Card = ({ image, name, description }) => {
  return (
    <div className="card-container">
      <img src={image} alt="Profile" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <a href="#" className="btn btn-primary">Know More</a>
      </div>
    </div>
  );
};

export default Card;
