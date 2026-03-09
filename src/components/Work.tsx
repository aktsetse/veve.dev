import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = {
  title: string;
  category: string;
  summary: string;
  tools: string;
  image: string;
  link?: string;
  year: string;
};

const projects: Project[] = [
  {
    title: "Inkspire",
    category: "Web Application",
    summary: "Book Social Platform",
    tools:
      "React, Vite, CSS, Node.js, Express, Prisma, PostgreSQL, Supabase, RESTful APIs",
    image: "/images/Inkspire.jpeg",
    link: "https://github.com/aktsetse/Inkspire",
    year: "2025",
  },
  {
    title: "BrainTrek",
    category: "Terminal Application",
    summary: "Game",
    tools: "Java, AWT, Swing",
    image: "/images/BrainTrek.png",
    link: "https://github.com/aktsetse/BrainTrek",
    year: "2025",
  },
  {
    title: "MobileStrokeUnit App",
    category: "Web Application",
    summary: "Health Platform",
    tools: "React, Flask, Bootstrap, Axios, SQLite",
    image: "/images/MobileStrokeUnit.png",
    link: "https://ephemeral-taiyaki-bf5fc3.netlify.app/",
    year: "2025",
  },
  {
    title: "MediBill",
    category: "Web Application",
    summary: "Health Platform",
    tools: "Typescript, React, Tailwindcss, Next.js, Firebase Auth, Tesseract",
    image: "/images/MediBill.jpeg",
    link: "https://medi-bill-eight.vercel.app/login",
    year: "2025",
  },
  {
    title: "Brille Technology",
    category: "iOS Application",
    summary: "Disability Assistance",
    tools: "Makefile, Swift, C++, SwiftUI",
    image: "/images/Brille Technology.jpeg",
    link: "https://github.com/aktsetse/Braille-Technology",
    year: "2025",
  },
  {
    title: "Limit Order Book Simulator",
    category: "Market Simulation",
    summary: "Trading Assistant",
    tools: "Python, NumPy, Pandas, C++, asyncio, matplotlib",
    image: "/images/Limit Order Simulator.jpeg",
    year: "2026",
  },
];

const Work = () => {
  useGSAP(() => {
  let translateX = 0;

    function setTranslateX() {
      const boxes = document.getElementsByClassName("work-box");
      const workContainer = document.querySelector(".work-container");
      if (!boxes.length || !workContainer) return;

      const boxWidth = boxes[0].getBoundingClientRect().width;
      const containerWidth = workContainer.getBoundingClientRect().width;
      const rectLeft = workContainer.getBoundingClientRect().left;
      const padding = parseInt(window.getComputedStyle(boxes[0]).padding) / 2;
      translateX = Math.max(
        0,
        boxWidth * boxes.length - (rectLeft + containerWidth) + padding
      );
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${translateX}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: setTranslateX,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.title}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>
                      {project.category} • {project.year}
                    </p>
                  </div>
                </div>
                <h4>{project.summary}</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
