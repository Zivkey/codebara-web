export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-onyx py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-cream/40">
          &copy; 2025 Codebara &middot; Built with &#9749; in Ni&scaron;
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/codebara"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-cream/40 hover:text-capybara transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/codebara"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-cream/40 hover:text-capybara transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
