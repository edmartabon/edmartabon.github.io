import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";

const strengths = [
  "Full Stack Development",
  "DevOps",
  "SaaS Systems",
  "API & Database Architecture",
  "Deployment & Cloud",
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] bg-primary blur-[120px]" />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-6">
            Building systems that matter
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground mb-6">
            Full Stack &<br />
            <span className="gradient-text">DevOps Developer</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            I design, build, and deploy scalable SaaS platforms — from database architecture to production infrastructure. End-to-end engineering for real businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#projects" className="btn-primary">
              <ExternalLink size={16} />
              View Projects
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
          </div>

          {/* Credibility badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {strengths.map((s) => (
              <span key={s} className="badge-tech text-xs">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown size={20} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
