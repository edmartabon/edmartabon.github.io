import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">About</p>
          <h2 className="section-title mb-8">
            Engineering products,<br />not just writing code.
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              I'm a Full Stack & DevOps Developer focused on building production-grade SaaS platforms for real businesses. My work spans frontend interfaces, backend APIs, database architecture, and cloud deployment — I own the full system lifecycle.
            </p>
            <p>
              I've shipped clinic management platforms that handle daily operations for healthcare practices, architecting everything from data models to CI/CD pipelines. I approach every project with a product mindset: understanding the business problem first, then building reliable, maintainable systems that solve it.
            </p>
            <p>
              I value clean architecture, pragmatic decisions, and shipping work that actually runs in production — not just demos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
