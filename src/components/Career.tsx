import "./styles/Career.css";

type Experience = {
  role: string;
  company: string;
  year: string;
  description: string;
  logo?: string;
};

const experiences: Experience[] = [
  {
    company: "Gusto",
    role: "Software Engineering Intern",
    year: "2026",
    description: "Summer 2026",
    logo: "/images/Gusto,_Inc._logo.svg",
  },
  {
    company: "Google",
    role: "Software Engineering Fellow",
    year: "2026",
    description:
      "A 1-on-1 mentorship program organized by Code2Career that pairs students with Google software engineers for personalized guidance, career insights, and professional development in software engineering.",
    logo: "/images/google_logo.jpeg",
  },
  {
    company: "EY",
    role: "Expedition Program",
    year: "2026",
    description:
      "A career discovery program by EY that exposes students to consulting, business, and technology careers through mentorship, professional development sessions, and real-world business case experiences.",
    logo: "/images/ernstandyoung_logo.jpeg",
  },
  {
    company: "UNCF",
    role: "STEM Innovation Summit Participant",
    year: "2026",
    description:
      "1/50 selected to attend the UNCF STEM Innovation Summit in San Francisco, a national program connecting HBCU STEM students with Silicon Valley companies, industry leaders, and innovators to explore emerging technologies, career pathways, and the future of tech innovation.",
    logo: "/images/uncf_logo.jpeg",
  },
  {
    company: "CITI",
    role: "Scholar",
    year: "2025",
    description:
      "A selective program where HBCU students participate in a five-day immersive experience at Citi Headquarters in New York, gaining exposure to industry professionals while developing critical thinking, teamwork, and project management skills through real-world business challenges.",
    logo: "/images/citi_logo.png",
  },
  {
    company: "Mastercard",
    role: "Data Science Innovation Challenge Finalist",
    year: "2025",
    description:
      "Led a finalist team in a data science competition hosted by Mastercard, analyzing the Inclusive Growth Score to develop data-driven strategies for reducing housing access disparities in underserved communities.",
    logo: "/images/mastercard_logo.png",
  },
  {
    company: "The American Association for the Advancement of Science (AAAS)",
    role: "Maker Showcase & Innovation Showcase Competition Finalist",
    year: "2025",
    description:
      "Finalist in the AAAS HBCU Maker Showcase Pitch Competition, leading a team to develop an impact-driven solution aligned with the UN Sustainable Development Goals and recognized by NSF and industry experts.",
    logo: "/images/aaasorg_logo.jpeg",
  },
  {
    company: "NVIDIA",
    role: "Summer Bridge Program",
    year: "2025",
    description:
      "A professional development program by NVIDIA that introduces students to careers in AI, accelerated computing, and software engineering through mentorship, technical sessions, and industry insights.",
    logo: "/images/nvidia_logo.jpeg",
  },
  {
    company: "Amazon",
    role: "Campus Career Series",
    year: "2025",
    description:
      "A career exploration program by Amazon that provides students with insights into technology roles, professional development, and opportunities within Amazon through workshops and networking with industry professionals.",
    logo: "/images/amazon_logo.jpeg",
  },
  {
    company: "PwC",
    role: "Outamation AI-Powered Document Insights & Data Extraction Externship",
    year: "2025",
    description:
      "Built and optimized an AI-powered system to extract structured insights from documents using modern machine learning and NLP techniques.",
    logo: "/images/pwc_logo.jpeg",
  },
  {
    company: "Goldman Sachs",
    role: "Possibilities Summit Participant",
    year: "2024",
    description:
      "A career exploration program by Goldman Sachs that introduces students to opportunities in finance, technology, and leadership through mentorship, workshops, and networking with industry professionals.",
    logo: "/images/GoldmanSachs_logo.png",
  },
  {
    company: "Hearers and Givers Foundation",
    role: "Co-founder",
    year: "2022",
    description:
      "I co-founded a youth-led mental health organization dedicated to mitigating mental health distress through counseling, psychological aid, and annual donation drives.",
    logo: "/images/Hearers_logo.jpeg",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {experiences.map((experience, index) => (
            <div className="career-info-box" key={`${experience.company}-${index}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <div className="career-role-head">
                    <div className="career-logo" aria-hidden="true">
                      {experience.logo ? (
                        <img src={experience.logo} alt={`${experience.company} logo`} />
                      ) : (
                        <span>{getInitials(experience.company)}</span>
                      )}
                    </div>
                    <div className="career-role-text">
                      <h4>{experience.role}</h4>
                      <h5>{experience.company}</h5>
                    </div>
                  </div>
                </div>
                <h3>{experience.year}</h3>
              </div>
              <p>{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
