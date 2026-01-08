import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { Mail, Phone } from "lucide-react";

export const DATA = {
  name: "Harsh Dange",
  initials: "HD",
  url: "https://harshdange.dev",
  location: "Pune, India",
  description:
    "Backend Engineer & AI Enthusiast. I build scalable systems and intelligent applications. Passionate about Python, APIs, and AI-powered solutions.",
  summary:
    "I'm a Backend Engineer passionate about building robust, scalable systems. Currently pursuing B.Tech in Information Technology at VIT Pune, I specialize in Python, FastAPI, and AI/ML technologies. I love working on projects that combine backend engineering with AI capabilities, from RAG-powered chatbots to real-time collaboration tools.",
  
  contact: {
    email: "harshdange25@gmail.com",
    tel: "+91 9561239913",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/hsd2514",
        icon: GitHubLogoIcon,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/hd2514",
        icon: LinkedInLogoIcon,
      },
      Email: {
        name: "Email",
        url: "mailto:harshdange25@gmail.com",
        icon: EnvelopeClosedIcon,
      },
    },
  },

  work: [
    {
      company: "Freelancer",
      href: "https://upwork.com",
      badges: ["Remote", "Contract"],
      location: "Remote (Upwork)",
      title: "Python Developer",
      logoUrl: "/upwork.svg",
      start: "June 2024",
      end: "Present",
      description:
        "Developed Python pipelines using music21 and matplotlib for MIDI-to-audio alignment using Dynamic Time Warping (DTW). Built data processing systems with NumPy and pandas for music analysis. Generated MusicXML and MIDI files for advanced audio processing workflows.",
    },
  ],

  projects: [
    {
      title: "Legal AI Chat Bot",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "AI chatbot providing ~95% accurate responses to legal queries using RAG (Retrieval-Augmented Generation) and Google's Gemini API. Reduces manual research time significantly.",
      technologies: [
        "Python",
        "Gemini API",
        "RAG",
        "Faiss",
        "Streamlit",
        "Kaggle",
      ],
      links: [],
      image: "",
    },
    {
      title: "Digital Whiteboard",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "Real-time collaborative whiteboard with WebRTC video chat. Features multi-tool drawing (pen, shapes, text), color selection, and room-based collaboration via WebSocket.",
      technologies: [
        "React",
        "FastAPI",
        "WebRTC",
        "WebSocket",
        "Canvas API",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/hsd2514",
          icon: GitHubLogoIcon,
        },
      ],
      image: "",
    },
    {
      title: "Ticketing System",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "Streamlined ticket creation, tracking, and resolution system. Integrated with Google Apps Script for email automation and Python for backend processing.",
      technologies: ["Python", "AppScript", "Streamlit", "Gmail SMTP"],
      links: [],
      image: "",
    },
    {
      title: "Society Complaint Management",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "Flask-based web app for managing community complaints with role-based access control. Achieved 20% reduction in response times through efficient workflow design.",
      technologies: ["Flask", "SQLite", "HTML", "CSS", "Bootstrap"],
      links: [
        {
          type: "Source",
          href: "https://github.com/hsd2514",
          icon: GitHubLogoIcon,
        },
      ],
      image: "",
    },
  ],

  skills: [
    "Python",
    "JavaScript",
    "SQL",
    "HTML/CSS",
    "FastAPI",
    "Flask",
    "React",
    "Streamlit",
    "RAG",
    "Gemini API",
    "Faiss",
    "WebRTC",
    "WebSocket",
    "SQLite",
    "MongoDB",
    "Git",
    "Docker",
    "NumPy",
    "pandas",
    "Matplotlib",
  ],
};
