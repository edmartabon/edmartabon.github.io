import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Server, Layers, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Layers,
    title: "Full System Ownership",
    desc: "I work across the entire stack — frontend, backend, databases, APIs, and infrastructure. No handoffs, no gaps.",
  },
  {
    icon: Briefcase,
    title: "Production SaaS Platforms",
    desc: "Built and shipped clinic management systems handling real-world operations for healthcare businesses daily.",
  },
  {
    icon: Server,
    title: "DevOps & Deployment",
    desc: "From Docker containers to cloud infrastructure, I set up CI/CD pipelines and production environments that stay reliable.",
  },
  {
    icon: Rocket,
    title: "Product-Minded Engineering",
    desc: "I think beyond code — understanding the business problem, designing the architecture, and delivering systems that solve real workflows.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Experience</p>
          <h2 className="section-title mb-4">What I bring to the table.</h2>
          <p className="section-subtitle mb-12">
            Specializing in production-ready platforms and solving business workflow problems through full-stack engineering.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-premium p-6 flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <h.icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{h.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
