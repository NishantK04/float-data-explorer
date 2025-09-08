import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LatLngExpression } from "leaflet";
import {
  BarChart3,
  TrendingUp,
  Thermometer,
  Droplets,
  Globe,
  Activity,
  RefreshCw,
  Download,
} from "lucide-react";

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// React Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  const [mapData, setMapData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch yearly averages (2008–2019)
    fetch("http://127.0.0.1:8000/profiles/average_by_year?start_year=2008&end_year=2019")
      .then((res) => res.json())
      .then((data) => setYearlyData(data.averages || []));

    // Fetch map data for 2019
    fetch("http://127.0.0.1:8000/profiles/map_data?year=2019")
      .then((res) => res.json())
      .then((data) => setMapData(data.map_points || []));
  }, []);

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
            {
              icon: Globe,
              label: "Active Floats",
              value: "4,127",
              trend: "+23",
              color: "text-primary",
            },
            {
              icon: Thermometer,
              label: "Avg Temp",
              value: "18.4°C",
              trend: "+0.3",
              color: "text-orange-500",
            },
            {
              icon: Droplets,
              label: "Salinity",
              value: "34.7 PSU",
              trend: "-0.1",
              color: "text-blue-500",
            },
            {
              icon: Activity,
              label: "Data Points",
              value: "2.1M",
              trend: "+15K",
              color: "text-green-500",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="shadow-ocean animate-fade-up underwater-glow hover:animate-depth-pulse depth-effect"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
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
                    Average ocean temperature (2008–2019)
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-80 gradient-surface rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avg_temp" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Salinity Chart */}
            <Card className="shadow-ocean animate-fade-up [animation-delay:500ms] underwater-glow depth-effect hover:animate-depth-pulse">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  Salinity Levels (2008–2019)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 gradient-surface rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avg_salinity" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* World Map */}
            <Card className="shadow-ocean animate-fade-up [animation-delay:700ms] underwater-glow depth-effect hover:animate-depth-pulse">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  ARGO Float Positions (2019)
                </CardTitle>
                <CardDescription>Real-time positions of active floats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 gradient-surface rounded-lg overflow-hidden">
                  <MapContainer
                    center={[20, 0] as LatLngExpression}
                    zoom={2}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {mapData.map((point, idx) => (
                      <Marker key={idx} position={[point.latitude, point.longitude]}>
                        <Popup>
                          <div>
                            <strong>Ocean:</strong> {point.ocean_name} <br />
                            <strong>Temp:</strong> {point.avg_temp?.toFixed(2)}°C <br />
                            <strong>Salinity:</strong> {point.avg_salinity?.toFixed(2)} PSU
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Measurements */}
            <Card className="shadow-ocean animate-fade-up [animation-delay:800ms] underwater-glow depth-effect hover:animate-depth-pulse">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Measurements</CardTitle>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mapData.slice(0, 4).map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <div className="font-medium text-sm">
                        🌍 {point.ocean_name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Float #{idx + 1}
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-orange-600">{point.avg_temp?.toFixed(1)}°C</div>
                      <div className="text-blue-600">{point.avg_salinity?.toFixed(1)} PSU</div>
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
