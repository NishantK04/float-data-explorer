import { useState, useEffect } from "react";
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
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const regions = [
  { id: "arabian-sea", name: "Arabian Sea", coords: "20°N, 65°E", lat: 20, lon: 65 },
  { id: "north-atlantic", name: "North Atlantic", coords: "45°N, 30°W", lat: 45, lon: -30 },
  { id: "pacific-ocean", name: "Pacific Ocean", coords: "0°N, 160°W", lat: 0, lon: -160 },
  { id: "indian-ocean", name: "Indian Ocean", coords: "20°S, 80°E", lat: -20, lon: 80 },
  { id: "mediterranean", name: "Mediterranean Sea", coords: "35°N, 18°E", lat: 35, lon: 18 },
  { id: "south-atlantic", name: "South Atlantic", coords: "30°S, 10°W", lat: -30, lon: -10 },
];

const parameters = [
  { id: "temperature", name: "Temperature", icon: Thermometer, unit: "°C", color: "text-orange-500" },
  { id: "salinity", name: "Salinity", icon: Droplets, unit: "PSU", color: "text-blue-500" },
  { id: "pressure", name: "Pressure", icon: BarChart3, unit: "dbar", color: "text-green-500" },
];

const years = Array.from({ length: 2019 - 2008 + 1 }, (_, i) => 2008 + i);

const Compare = () => {
  const [region1, setRegion1] = useState("arabian-sea");
  const [region2, setRegion2] = useState("north-atlantic");
  const [selectedParameter, setSelectedParameter] = useState("temperature");
  const [startYear, setStartYear] = useState(2008);
  const [endYear, setEndYear] = useState(2019);
  const [chartData, setChartData] = useState<any[]>([]);

  const selectedParam = parameters.find((p) => p.id === selectedParameter);
  const region1Data = regions.find((r) => r.id === region1);
  const region2Data = regions.find((r) => r.id === region2);

  // 🔗 Fetch comparison data from FastAPI
  const fetchData = async () => {
    if (!region1Data || !region2Data) return;
    try {
      const [res1, res2] = await Promise.all([
        fetch(
          `http://127.0.0.1:8000/profiles/timeseries?lat=${region1Data.lat}&lon=${region1Data.lon}&variable=${selectedParameter}`
        ).then((r) => r.json()),
        fetch(
          `http://127.0.0.1:8000/profiles/timeseries?lat=${region2Data.lat}&lon=${region2Data.lon}&variable=${selectedParameter}`
        ).then((r) => r.json()),
      ]);

      // merge timeseries by year
      const merged: any[] = [];
      const data1 = res1.timeseries || [];
      const data2 = res2.timeseries || [];
      years.forEach((year) => {
        if (year >= startYear && year <= endYear) {
          merged.push({
            year,
            [region1Data.name]: data1.find((d: any) => d.year === year)?.avg_value || null,
            [region2Data.name]: data2.find((d: any) => d.year === year)?.avg_value || null,
          });
        }
      });
      setChartData(merged);
    } catch (err) {
      console.error("Error fetching comparison data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [region1, region2, selectedParameter, startYear, endYear]);

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
            Compare oceanographic parameters between different regions and years
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
              Select regions, parameter, and year range for comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Region 1 */}
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

              {/* Region 2 */}
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

              {/* Parameter */}
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

              {/* Start Year */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Year</label>
                <Select value={String(startYear)} onValueChange={(val) => setStartYear(Number(val))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* End Year */}
              <div className="space-y-2">
                <label className="text-sm font-medium">End Year</label>
                <Select value={String(endYear)} onValueChange={(val) => setEndYear(Number(val))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button variant="ocean" onClick={fetchData}>
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

        {/* Comparison Chart */}
        <Card className="shadow-ocean animate-fade-up [animation-delay:500ms]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {selectedParam?.icon && <selectedParam.icon className={`h-5 w-5 ${selectedParam.color}`} />}
                {selectedParam?.name} Comparison
              </CardTitle>
              <CardDescription>
                {region1Data?.name} vs {region2Data?.name} ({startYear} - {endYear})
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Yearly Averages
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={region1Data?.name}
                    stroke="#0088FE"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey={region2Data?.name}
                    stroke="#FF8042"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Compare;
