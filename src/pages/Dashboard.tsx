import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Thermometer, 
  Droplets, 
  Wind,
  Globe,
  Activity,
  RefreshCw,
  Download,
  MapPin
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 relative">
      <div className="container mx-auto px-4 py-8 relative z-30">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Ocean Data Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time oceanographic data from ARGO floats worldwide
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Globe, label: "Active Floats", value: "4,127", trend: "+23", color: "text-primary" },
            { icon: Thermometer, label: "Avg Temp", value: "18.4°C", trend: "+0.3", color: "text-orange-500" },
            { icon: Droplets, label: "Salinity", value: "34.7 PSU", trend: "-0.1", color: "text-blue-500" },
            { icon: Activity, label: "Data Points", value: "2.1M", trend: "+15K", color: "text-green-500" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-ocean animate-fade-up underwater-glow hover:animate-depth-pulse depth-effect" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="gradient-ocean rounded-lg p-2 animate-float">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Temperature Chart */}
            <Card className="shadow-ocean animate-fade-up [animation-delay:400ms] underwater-glow depth-effect hover:animate-depth-pulse">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-orange-500" />
                    Ocean Temperature Trends
                  </CardTitle>
                  <CardDescription>
                    Global ocean temperature variations over the last 30 days
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-80 gradient-surface rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-secondary-dark mx-auto mb-4 opacity-50" />
                    <p className="text-secondary-dark font-medium">Interactive Temperature Chart</p>
                    <p className="text-secondary-dark/70 text-sm mt-2">
                      Connected to Flask API endpoint: /getGraphData
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Salinity & Pressure Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-ocean animate-fade-up [animation-delay:500ms] underwater-glow depth-effect hover:animate-depth-pulse">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Salinity Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 gradient-surface rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Droplets className="h-12 w-12 text-secondary-dark mx-auto mb-3 opacity-50" />
                      <p className="text-secondary-dark font-medium">Salinity Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-ocean animate-fade-up [animation-delay:600ms] underwater-glow depth-effect hover:animate-depth-pulse">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-green-500" />
                    Pressure Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 gradient-surface rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Wind className="h-12 w-12 text-secondary-dark mx-auto mb-3 opacity-50" />
                      <p className="text-secondary-dark font-medium">Pressure Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* World Map */}
            <Card className="shadow-ocean animate-fade-up [animation-delay:700ms] underwater-glow depth-effect hover:animate-depth-pulse">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  ARGO Float Positions
                </CardTitle>
                <CardDescription>
                  Real-time positions of active floats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 gradient-surface rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-secondary-dark mx-auto mb-3 opacity-50" />
                    <p className="text-secondary-dark font-medium">Interactive World Map</p>
                    <p className="text-secondary-dark/70 text-sm mt-2">
                      API: /getMapData
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Data */}
            <Card className="shadow-ocean animate-fade-up [animation-delay:800ms] underwater-glow depth-effect hover:animate-depth-pulse">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Measurements</CardTitle>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { location: "Arabian Sea", temp: "26.4°C", salinity: "36.2", time: "2 min ago" },
                  { location: "North Atlantic", temp: "12.8°C", salinity: "35.1", time: "5 min ago" },
                  { location: "Pacific Ocean", temp: "22.1°C", salinity: "34.8", time: "8 min ago" },
                  { location: "Indian Ocean", temp: "25.3°C", salinity: "35.6", time: "12 min ago" }
                ].map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium text-sm">{data.location}</div>
                      <div className="text-xs text-muted-foreground">{data.time}</div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-orange-600">{data.temp}</div>
                      <div className="text-blue-600">{data.salinity} PSU</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-ocean animate-fade-up [animation-delay:900ms] underwater-glow depth-effect hover:animate-depth-pulse">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ocean" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh All
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;