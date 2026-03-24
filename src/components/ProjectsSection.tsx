import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Dentify",
    url: "https://dentify.ph",
    role: "Full Stack & DevOps Developer",
    summary:
      "A modern dental clinic management platform designed to streamline scheduling, patient records, billing, and daily workflows for dental practices. Built as a complete SaaS system handling real clinic operations end-to-end.",
    stack: ["React", "Laravel", "MySQL", "Docker", "AWS", "REST API"],
  },
  {
    name: "VetCliq",
    url: "https://vetcliq.com",
    role: "Full Stack & DevOps Developer",
    summary:
      "A veterinary practice management platform built to support appointments, patient workflows, clinic operations, and business management. Designed as a reliable, web-based system serving real veterinary clinics.",
    stack: ["Vue.js", "Laravel", "PostgreSQL", "Docker", "GCP", "REST API"],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Featured Work</p>
          <h2 className="section-title mb-4">Flagship projects.</h2>
          <p className="section-subtitle mb-12">
            Production SaaS platforms I built from database to deployment.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card-premium p-8 group flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{project.name}</h3>
                    <p className="text-primary text-sm font-mono">{project.role}</p>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5"
                    aria-label={`Visit ${project.name}`}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span key={tech} className="badge-tech text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs w-fit"
                >
                  <ExternalLink size={14} />
                  Visit Site
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
