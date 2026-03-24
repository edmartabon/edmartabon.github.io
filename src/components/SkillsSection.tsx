import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend",
    skills: ["Laravel", "PHP", "Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "Redis", "Database Design"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "AWS", "GCP", "CI/CD", "Nginx", "Linux"],
  },
  {
    title: "Tools & Workflow",
    skills: ["Git", "GitHub Actions", "Figma", "Postman", "VS Code"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Tech Stack</p>
          <h2 className="section-title mb-4">Tools I build with.</h2>
          <p className="section-subtitle mb-12">
            A focused stack for shipping full systems — frontend to infrastructure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-premium p-6"
              >
                <h3 className="text-sm font-semibold text-foreground mb-4 tracking-wide">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="badge-tech">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
