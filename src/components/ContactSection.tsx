import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

const EMAIL = "edmartabon@gmail.com";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="section-title mb-4">Let's build something.</h2>
          <p className="section-subtitle mx-auto mb-10">
            Whether you're a recruiter, founder, or client — I'm open to discussing new opportunities, projects, and collaborations.
          </p>

          <div className="card-premium p-6 inline-flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-primary" />
              <a
                href={`mailto:${EMAIL}`}
                className="text-foreground font-mono text-sm hover:text-primary transition-colors"
              >
                {EMAIL}
              </a>
            </div>
            <button
              onClick={handleCopy}
              className="btn-outline text-xs px-4 py-2"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
