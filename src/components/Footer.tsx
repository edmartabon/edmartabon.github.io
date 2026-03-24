const Footer = () => (
  <footer className="border-t border-border/40 py-8 px-4">
    <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} Ed Martabon. All rights reserved.</p>
      <p className="font-mono text-xs">Full Stack & DevOps Developer</p>
    </div>
  </footer>
);

export default Footer;
