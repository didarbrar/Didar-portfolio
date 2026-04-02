import { memo } from "react";
import "./styles/Education.css";

const educationData = [
  {
    title: "MSc Statistics with Data Science",
    institution: "University of Edinburgh",
    date: "2025 - 2026",
    position: "left" as const,
  },
  {
    title: "BSc Physics (Hons.)",
    institution: "St. Stephen's College, University of Delhi",
    date: "2022 - 2025",
    position: "right" as const,
  },
  {
    title: "Class 12",
    institution: "S.S. Adarsh Convent School, Padampur",
    date: "2022 | 93.80%",
    position: "left" as const,
  },
  {
    title: "Class 10",
    institution: "S.S. Adarsh Convent School, Padampur",
    date: "2020 | 94.00%",
    position: "right" as const,
  },
];

const Education = () => {
  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  return (
    <div className="education-section" id="education">
      <div className="education-container">
        <h2>
          My <span>Education</span>
        </h2>

        <div className="education-timeline">
          {educationData.map((item, index) => (
            <div
              key={index}
              className={`timeline-item timeline-${item.position}`}
              style={{ "--item-delay": `${index * 0.15}s` } as React.CSSProperties}
            >
              <div className="timeline-node" />
              <div
                className="education-card"
                onMouseMove={handleCardMove}
              >
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <h4>{item.institution}</h4>
                  <p>{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Education);
