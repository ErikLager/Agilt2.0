import './Contactus.css'

const Contactus = () => {


    return (
        <>
       <form className="contactus-form">
    <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" />
    </div>
    <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" />
    </div>
    <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5"></textarea>
    </div>
    <button class="Submit-btn">Submit</button>
</form>
        </>
    )
};

export default Contactus;