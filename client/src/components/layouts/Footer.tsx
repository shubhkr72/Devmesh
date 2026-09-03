import { PLATFORM_NAME } from "@/lib/platform";
import { CodeXml, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40">
      <div className="section-container flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CodeXml className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              {PLATFORM_NAME}
            </p>
            <p className="text-ls text-muted-foreground">
              Developer network · Discover · Connect · Chat
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Built by <span className="font-semibold text-foreground">Shubham Sebrin</span>
          </span>

          <a
            href="https://github.com/shubhkr72"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subham's GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </a>

          <a
            href="https://linkedin.com/in/shubham-sebrin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subham's LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;