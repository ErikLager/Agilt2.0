import './Productcard.css';
import Hat from './Hat.png';

const FrontpageProductcard = () => {

  return (
    <div className="container">
      <div className="card">
        <img className="frontimg" src={Hat} />
        <div className="contentBx">
          <h2>Fancy Hat</h2>
          <div className="size">
            <h3>This is some random text</h3>
          </div>
          <a href="#">Read more</a>
        </div>
      </div>
    </div>
  )
};

export default FrontpageProductcard;