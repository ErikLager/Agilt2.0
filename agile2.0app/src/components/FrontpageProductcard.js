import './Productcard.css';
import Hat from './Hat.png';

const FrontpageProductcard = () => {

  return (
    <div class="container">
      <div class="card">
        <img src={Hat} />
        <div class="contentBx">
          <h2>Fancy Hat</h2>
          <div class="size">
            <h3>This is some random text</h3>
          </div>
          <a href="#">Read more</a>
        </div>
      </div>
    </div>
  )
};

export default FrontpageProductcard;