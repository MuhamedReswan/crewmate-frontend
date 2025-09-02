import { ThemeToggleProps } from "@/types/theme.type";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-muted-foreground p-2 hover:bg-primary-foreground hover:text-muted rounded-lg transition-colors"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
