import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  GitCompare, 
  BarChart3, 
  Thermometer, 
  Droplets, 
  ArrowLeftRight,
  Download,
  RefreshCw,
  MapPin,
  Calendar,
  TrendingUp
} from "lucide-react";

const regions = [
  { id: "arabian-sea", name: "Arabian Sea", coords: "20°N, 65°E" },
  { id: "north-atlantic", name: "North Atlantic", coords: "45°N, 30°W" },
  { id: "pacific-ocean", name: "Pacific Ocean", coords: "0°N, 160°W" },
  { id: "indian-ocean", name: "Indian Ocean", coords: "20°S, 80°E" },
  { id: "mediterranean", name: "Mediterranean Sea", coords: "35°N, 18°E" },
  { id: "south-atlantic", name: "South Atlantic", coords: "30°S, 10°W" }
];

const timeRanges = [
  { id: "7d", name: "Last 7 days" },
  { id: "30d", name: "Last 30 days" },
  { id: "3m", name: "Last 3 months" },
  { id: "6m", name: "Last 6 months" },
  { id: "1y", name: "Last year" }
];

const parameters = [
  { id: "temperature", name: "Temperature", icon: Thermometer, unit: "°C", color: "text-orange-500" },
  { id: "salinity", name: "Salinity", icon: Droplets, unit: "PSU", color: "text-blue-500" },
  { id: "pressure", name: "Pressure", icon: BarChart3, unit: "dbar", color: "text-green-500" }
];

const Compare = () => {
  const [region1, setRegion1] = useState("arabian-sea");
  const [region2, setRegion2] = useState("north-atlantic");
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedParameter, setSelectedParameter] = useState("temperature");

  const selectedParam = parameters.find(p => p.id === selectedParameter);
  const region1Data = regions.find(r => r.id === region1);
  const region2Data = regions.find(r => r.id === region2);

  const mockData = {
    "arabian-sea": { temp: "26.4°C", salinity: "36.2 PSU", pressure: "1013 dbar", trend: "+0.3" },
    "north-atlantic": { temp: "12.8°C", salinity: "35.1 PSU", pressure: "1015 dbar", trend: "-0.1" },
    "pacific-ocean": { temp: "22.1°C", salinity: "34.8 PSU", pressure: "1012 dbar", trend: "+0.2" },
    "indian-ocean": { temp: "25.3°C", salinity: "35.6 PSU", pressure: "1014 dbar", trend: "+0.1" },
    "mediterranean": { temp: "19.7°C", salinity: "38.5 PSU", pressure: "1016 dbar", trend: "-0.2" },
    "south-atlantic": { temp: "18.2°C", salinity: "35.3 PSU", pressure: "1013 dbar", trend: "+0.4" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <div className="gradient-ocean rounded-xl p-3">
              <GitCompare className="h-8 w-8 text-primary-foreground" />
            </div>
            Ocean Data Comparison
          </h1>
          <p className="text-muted-foreground text-lg">
            Compare oceanographic parameters between different regions and time periods
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-8 shadow-ocean animate-fade-up [animation-delay:200ms]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-primary" />
              Comparison Settings
            </CardTitle>
            <CardDescription>
              Select regions, parameters, and time range for comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Region 1</label>
                <Select value={region1} onValueChange={setRegion1}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Region 2</label>
                <Select value={region2} onValueChange={setRegion2}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Parameter</label>
                <Select value={selectedParameter} onValueChange={setSelectedParameter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {parameters.map((param) => (
                      <SelectItem key={param.id} value={param.id}>
                        {param.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range.id} value={range.id}>
                        {range.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button variant="ocean">
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Comparison
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Results */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Region 1 */}
          <Card className="shadow-ocean animate-fade-up [animation-delay:300ms]">
            <CardHeader className="gradient-ocean text-primary-foreground">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {region1Data?.name}
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                {region1Data?.coords}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {parameters.map((param) => {
                  const Icon = param.icon;
                  const value = param.id === 'temperature' ? mockData[region1 as keyof typeof mockData]?.temp :
                               param.id === 'salinity' ? mockData[region1 as keyof typeof mockData]?.salinity :
                               mockData[region1 as keyof typeof mockData]?.pressure;
                  
                  return (
                    <div key={param.id} className={`p-4 rounded-lg border-2 ${
                      param.id === selectedParameter ? 'border-primary bg-primary/5' : 'border-border/50 bg-muted/30'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="gradient-surface rounded-lg p-2">
                            <Icon className={`h-5 w-5 ${param.color}`} />
                          </div>
                          <div>
                            <div className="font-medium">{param.name}</div>
                            <div className="text-sm text-muted-foreground">{param.unit}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">{value}</div>
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {mockData[region1 as keyof typeof mockData]?.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Region 2 */}
          <Card className="shadow-ocean animate-fade-up [animation-delay:400ms]">
            <CardHeader className="gradient-surface">
              <CardTitle className="flex items-center gap-2 text-secondary-dark">
                <MapPin className="h-5 w-5" />
                {region2Data?.name}
              </CardTitle>
              <CardDescription className="text-secondary-dark/80">
                {region2Data?.coords}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {parameters.map((param) => {
                  const Icon = param.icon;
                  const value = param.id === 'temperature' ? mockData[region2 as keyof typeof mockData]?.temp :
                               param.id === 'salinity' ? mockData[region2 as keyof typeof mockData]?.salinity :
                               mockData[region2 as keyof typeof mockData]?.pressure;
                  
                  return (
                    <div key={param.id} className={`p-4 rounded-lg border-2 ${
                      param.id === selectedParameter ? 'border-primary bg-primary/5' : 'border-border/50 bg-muted/30'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="gradient-surface rounded-lg p-2">
                            <Icon className={`h-5 w-5 ${param.color}`} />
                          </div>
                          <div>
                            <div className="font-medium">{param.name}</div>
                            <div className="text-sm text-muted-foreground">{param.unit}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">{value}</div>
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {mockData[region2 as keyof typeof mockData]?.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        <Card className="shadow-ocean animate-fade-up [animation-delay:500ms]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {selectedParam?.icon && <selectedParam.icon className={`h-5 w-5 ${selectedParam.color}`} />}
                {selectedParam?.name} Comparison
              </CardTitle>
              <CardDescription>
                Side-by-side comparison of {selectedParam?.name.toLowerCase()} between {region1Data?.name} and {region2Data?.name}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {timeRanges.find(t => t.id === timeRange)?.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96 gradient-surface rounded-lg flex items-center justify-center">
              <div className="text-center">
                <GitCompare className="h-16 w-16 text-secondary-dark mx-auto mb-4 opacity-50" />
                <p className="text-secondary-dark font-medium text-lg">Comparative Chart Visualization</p>
                <p className="text-secondary-dark/70 text-sm mt-2">
                  Connected to Flask API endpoint: /compareData
                </p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 gradient-ocean rounded-full"></div>
                    <span className="text-sm text-secondary-dark">{region1Data?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="text-sm text-secondary-dark">{region2Data?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Compare;