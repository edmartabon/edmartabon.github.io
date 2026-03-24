import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap, Bot } from "lucide-react";

const AISection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="card-premium p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.04] bg-primary blur-[80px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles size={20} />
              </div>
              <p className="text-primary font-mono text-sm tracking-widest uppercase">Modern Edge</p>
            </div>

            <h2 className="section-title mb-4">AI-augmented development.</h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              I integrate AI-assisted workflows into my development process — from code generation and testing to documentation and deployment automation. This isn't about hype; it's about shipping faster with higher quality and staying ahead of modern engineering practices.
            </p>

            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap size={16} className="text-primary" />
                <span>Accelerated delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bot size={16} className="text-primary" />
                <span>AI-assisted workflows</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles size={16} className="text-primary" />
                <span>Continuous improvement</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AISection;
