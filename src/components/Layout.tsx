import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ThemeProvider } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import UnderwaterLandscape from "./UnderwaterLandscape";
import AnimatedFish from "./AnimatedFish";
import { 
  Waves, 
  BarChart3, 
  MessageSquare, 
  GitCompare, 
  Info,
  Menu,
  X
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Waves },
  { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  { name: "Chat", path: "/chat", icon: MessageSquare },
  { name: "Compare", path: "/compare", icon: GitCompare },
  { name: "About", path: "/about", icon: Info },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen gradient-ocean relative overflow-hidden">
        <UnderwaterLandscape />
        <AnimatedFish />
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-border/20 bg-card/20 backdrop-blur-xl shadow-glass">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="gradient-ocean rounded-lg p-2 animate-glow-pulse group-hover:animate-float shadow-neon">
                  <Waves className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold neon-text group-hover:animate-neon-flicker transition-glow">FloatChat</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant={isActive ? "neon" : "glass"}
                        className={cn(
                          "flex items-center space-x-2",
                          isActive && "text-primary shadow-neon"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>

              {/* Theme Toggle & Mobile Menu */}
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button
                  variant="glass"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden pb-4 animate-slide-in">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Link 
                        key={item.path} 
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant={isActive ? "neon" : "glass"}
                          className={cn(
                            "w-full justify-start space-x-2",
                            isActive && "text-primary shadow-neon"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-4rem)] relative z-20">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/20 bg-card/10 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="gradient-ocean rounded-lg p-1 shadow-neon">
                  <Waves className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  FloatChat - Making Ocean Data Accessible to All
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                SIH Hackathon Project © 2024
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Layout;