import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  Globe, 
  Award,
  Lightbulb,
  Heart,
  Code,
  Database,
  BarChart3,
  MessageSquare,
  ExternalLink,
  Github
} from "lucide-react";

const teamMembers = [
  { name: "Research Team", role: "Oceanographic Data Analysis", icon: BarChart3 },
  { name: "AI Team", role: "Natural Language Processing", icon: MessageSquare },
  { name: "Backend Team", role: "Flask API Development", icon: Database },
  { name: "Frontend Team", role: "UI/UX Development", icon: Code }
];

const features = [
  {
    icon: BarChart3,
    title: "Interactive Dashboards",
    description: "Real-time visualization of ocean data with charts and maps"
  },
  {
    icon: MessageSquare,
    title: "AI-Powered Chatbot",
    description: "Natural language queries for ocean data exploration"
  },
  {
    icon: Globe,
    title: "Global ARGO Network",
    description: "Access to worldwide oceanographic float data"
  },
  {
    icon: Target,
    title: "Educational Focus",
    description: "Designed for students, researchers, and policymakers"
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About FloatChat
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Democratizing ocean research through AI-powered data visualization and natural language interaction
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-16 shadow-float animate-fade-up [animation-delay:200ms]">
          <CardHeader className="gradient-ocean text-primary-foreground text-center">
            <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-3">
              <Target className="h-8 w-8" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 md:p-12">
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                FloatChat bridges the gap between complex oceanographic data and accessibility for everyone. 
                We believe that understanding our oceans shouldn't require advanced technical knowledge.
              </p>
              <p className="text-muted-foreground">
                By leveraging AI and intuitive design, we're making ocean data exploration as simple as having a conversation, 
                empowering students, researchers, and policymakers to make informed decisions about our planet's future.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Project Goals */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-ocean animate-fade-up [animation-delay:300ms]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-primary" />
                Innovation Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Simplify Data Access:</strong> Make ocean data accessible through natural language queries
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Educational Impact:</strong> Support ocean science education at all levels
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Policy Support:</strong> Provide tools for evidence-based ocean policy decisions
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-ocean animate-fade-up [animation-delay:400ms]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-red-500" />
                Impact Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Climate Research:</strong> Supporting climate change studies through ocean data
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Marine Conservation:</strong> Enabling better ocean ecosystem protection
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Education:</strong> Inspiring the next generation of ocean scientists
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up [animation-delay:500ms]">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center shadow-ocean hover:shadow-float transition-smooth transform hover:-translate-y-2 animate-fade-up"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="gradient-ocean rounded-xl p-4 w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* SIH Hackathon */}
        <Card className="mb-16 shadow-float animate-fade-up [animation-delay:900ms]">
          <CardHeader className="gradient-surface">
            <CardTitle className="flex items-center gap-3 text-secondary-dark">
              <Award className="h-6 w-6" />
              Smart India Hackathon 2024
            </CardTitle>
            <CardDescription className="text-secondary-dark/80">
              Developed as part of the national innovation challenge
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Solving Real-World Ocean Data Challenges
                </h3>
                <p className="text-muted-foreground mb-4">
                  FloatChat was created to address the critical need for accessible ocean data analysis tools. 
                  Our team recognized that while ARGO float data is invaluable for understanding ocean conditions, 
                  it remained largely inaccessible to non-technical users.
                </p>
                <p className="text-muted-foreground">
                  Through this hackathon project, we're demonstrating how AI and modern web technologies 
                  can democratize scientific data access and support evidence-based decision making.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {teamMembers.map((member, index) => {
                    const Icon = member.icon;
                    return (
                      <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                        <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                        <div className="text-sm font-medium text-foreground">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-16 shadow-ocean animate-fade-up [animation-delay:1000ms]">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Code className="h-6 w-6 text-primary" />
              Technology Stack
            </CardTitle>
            <CardDescription>
              Built with modern, scalable technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Vite</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Flask</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">REST API</Badge>
                  <Badge variant="secondary">AI/ML</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Visualization</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Recharts</Badge>
                  <Badge variant="secondary">Mapbox</Badge>
                  <Badge variant="secondary">Chart.js</Badge>
                  <Badge variant="secondary">D3.js</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center animate-fade-up [animation-delay:1100ms]">
          <Card className="gradient-ocean text-primary-foreground shadow-depth max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Join the Ocean Data Revolution
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Explore our platform, contribute to ocean research, and help make scientific data accessible to everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="surface" size="lg" className="text-lg px-8 py-6 h-auto">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Explore Dashboard
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto border-white/30 text-white hover:bg-white/10">
                  <Github className="h-5 w-5 mr-2" />
                  View on GitHub
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;