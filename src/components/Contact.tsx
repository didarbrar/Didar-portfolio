import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:didarbrar123@gmail.com" data-cursor="disable">
                didarbrar123@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+447887159687" data-cursor="disable">
                +44 7887 159687
              </a>
            </p>
            <h4>Education</h4>
            <p>MSc Statistics with Data Science</p>
          </div>

          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/didarbrar"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/didar-singh-a967b92a4/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn  <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Didar Singh</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
