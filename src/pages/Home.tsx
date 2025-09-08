import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  MessageSquare, 
  GitCompare, 
  Globe, 
  Zap, 
  Users,
  ChevronRight,
  Play
} from "lucide-react";
import heroImage from "@/assets/hero-ocean.jpg";

const features = [
  {
    icon: BarChart3,
    title: "Interactive Dashboards",
    description: "Visualize oceanographic data with dynamic charts and real-time ARGO float positions",
    gradient: "gradient-ocean"
  },
  {
    icon: MessageSquare,
    title: "AI-Powered Chat",
    description: "Ask natural language questions and get instant data visualizations and insights",
    gradient: "gradient-surface"
  },
  {
    icon: GitCompare,
    title: "Data Comparison",
    description: "Compare oceanographic parameters across different regions and time periods",
    gradient: "gradient-ocean"
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Access data from thousands of ARGO floats deployed across the world's oceans",
    gradient: "gradient-surface"
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description: "Get up-to-date ocean conditions and environmental monitoring data",
    gradient: "gradient-ocean"
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Designed for students, researchers, and policymakers - no coding required",
    gradient: "gradient-surface"
  }
];

const stats = [
  { number: "4,000+", label: "Active ARGO Floats" },
  { number: "2M+", label: "Data Points" },
  { number: "70+", label: "Countries" },
  { number: "24/7", label: "Data Collection" }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-20" />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
              Making Ocean Data
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Accessible to All
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto animate-fade-up [animation-delay:200ms]">
              Discover, visualize, and analyze oceanographic data from ARGO floats worldwide. 
              Ask questions in natural language and get instant insights about our oceans.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-up [animation-delay:400ms]">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6 h-auto btn-glow hover-lift">
                  <BarChart3 className="h-6 w-6 mr-3" />
                  Explore Data
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto hover-lift">
                  <Play className="h-6 w-6 mr-3" />
                  Try AI Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-up hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <div className="text-base md:text-lg font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Ocean Data Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to explore, understand, and analyze oceanographic data 
              from the world's largest network of autonomous ocean sensors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="group hover-lift shadow-elegant hover:shadow-glow transition-all animate-fade-up border-0 glass"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-8">
                      <div className="gradient-primary rounded-2xl p-4 w-fit mb-6 group-hover:animate-pulse-glow">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto text-white animate-fade-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Ready to Dive into Ocean Data?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white/90">
              Join researchers, students, and policymakers worldwide in exploring 
              the depths of our oceans through data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/dashboard">
                <Button variant="secondary" size="lg" className="text-lg px-10 py-6 h-auto font-semibold hover-lift">
                  <BarChart3 className="h-6 w-6 mr-3" />
                  Start Exploring
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-lg px-10 py-6 h-auto border-white/30 text-white hover:bg-white/10 font-semibold hover-lift">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;