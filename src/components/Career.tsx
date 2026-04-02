import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My <span>internship</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Vice Chancellor Intern</h4>
                <h5>University of Delhi</h5>
              </div>
              <h3>Nov 2023 - Apr 2024</h3>
            </div>
            <div className="career-summary">
              <p>
                Designed and delivered enhanced analytical reports using regression analysis, probability modelling, and descriptive statistics, enabling data-driven decision-making across Economics departments and reducing reporting turnaround time by around 70%.
              </p>
              <a
                href="/Certificates/vcis%20certificate%20.pdf"
                target="_blank"
                rel="noreferrer"
                className="career-certificate"
              >
                View Certificate
              </a>
            </div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Summer Intern</h4>
                <h5>IIT Jodhpur</h5>
              </div>
              <h3>May 2024 - Jul 2024</h3>
            </div>
            <div className="career-summary">
              <p>
                Implemented a biophysically grounded computational model of anaesthesia-induced neural dynamics in Python, reproducing [published / network-level] behaviour using conductance-based neuron models and synaptic coupling within the Brian2 and NEURON simulation environments.
              </p>
              <a
                href="/Certificates/IIT%20certificate.pdf"
                target="_blank"
                rel="noreferrer"
                className="career-certificate"
              >
                View Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
