const Footer = () => (
  <footer className="border-t border-border bg-background py-10">
    <div className="container mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl tracking-wider text-primary">
            bodroq<span className="text-accent">.uz</span>
          </h2>
          <p className="font-body text-xs text-muted-foreground mt-1">
            Bepul filmlar va seriallar
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          {["About", "Help Center", "Privacy", "Terms"].map((l) => (
            <button key={l} className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </button>
          ))}
        </div>
      </div>
      <p className="font-body text-[10px] text-muted-foreground mt-8">
        © 2026 bodroq.uz. Barcha huquqlar himoyalangan.
      </p>
    </div>
  </footer>
);

export default Footer;
