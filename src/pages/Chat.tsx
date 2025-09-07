import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import {
  MessageSquare,
  Send,
  BarChart3,
  Thermometer,
  Droplets,
  Sparkles,
  User,
  Bot,
  Clock,
  Globe,
  AlertCircle,
  Loader2
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  dataType?: 'chart' | 'map' | 'table';
  data?: any;
  error?: boolean;
  loading?: boolean;
}

// --- Add this helper above Chat component ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-gray-500 text-xs font-medium">Year: {label}</p>
        {payload.map((item: any) => (
          <p key={item.dataKey} className="text-sm font-semibold" style={{ color: item.stroke }}>
            {item.name}: {item.value?.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI assistant for ocean data exploration. Ask me anything about ARGO float data, like "Show me temperature trends in the Arabian Sea" or "Compare salinity between the Atlantic and Pacific oceans".',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({ connected: false, checking: true });

  const chartRef = useRef<HTMLDivElement>(null);
  const handleDownloadChart = async () => {
    if (chartRef.current) {
      const dataUrl = await htmlToImage.toPng(chartRef.current);
      download(dataUrl, "ocean_data_chart.png");
    }
  };
  const sampleQuestions = [
    "Show salinity in Arabian Sea, March 2023",
    "Temperature trends in North Atlantic",
    "Compare Pacific vs Atlantic temperatures",
    "ARGO float positions near Australia",
    "Ocean depth profiles for the Mediterranean"
  ];

  // Check API status on mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await apiClient.healthCheck();
        setApiStatus({ connected: true, checking: false });
      } catch {
        setApiStatus({ connected: false, checking: false });
      }
    };
    checkApiStatus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: 'Analyzing your query and fetching ocean data...',
      timestamp: new Date(),
      loading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await apiClient.naturalLanguageQuery(inputValue);

      if (response.error) throw new Error(response.error);

      const botResponse: Message = {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: `I found ${response.results.length} data points. Here's the visualization based on your query.`,
        timestamp: new Date(),
        dataType: inputValue.toLowerCase().includes('compare') ? 'chart' :
          inputValue.toLowerCase().includes('position') || inputValue.toLowerCase().includes('location') ? 'map' : 'chart',
        data: response.results
      };

      setMessages(prev => prev.slice(0, -1).concat(botResponse));
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: 'Sorry, I encountered an error processing your request. Please check if the API is running or try a different query.',
        timestamp: new Date(),
        error: true,
      };
      setMessages(prev => prev.slice(0, -1).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: string) => setInputValue(question);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 relative">
      <div className="container mx-auto px-4 py-8 relative z-30">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <div className="gradient-ocean rounded-xl p-3 animate-depth-pulse">
              <MessageSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            AI Ocean Data Chat
          </h1>
          <p className="text-muted-foreground text-lg">
            Ask questions in natural language and get instant ocean data insights
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col shadow-ocean animate-fade-up underwater-glow depth-effect">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Ocean Data Assistant
                </CardTitle>
                <CardDescription>
                  Powered by AI • Connected to Flask API
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-primary' : 'gradient-ocean'}`}>
                        {message.type === 'user' ? <User className="h-4 w-4 text-primary-foreground" /> : <Bot className="h-4 w-4 text-primary-foreground" />}
                      </div>

                      <div className={`space-y-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-3 rounded-lg transition-smooth ${message.type === 'user' ? 'bg-primary text-primary-foreground shadow-ocean' : message.error ? 'bg-destructive/10 border border-destructive/20 text-destructive' : 'bg-muted border border-border/50 underwater-glow'}`}>
                          <div className="flex items-center gap-2">
                            {message.loading && <Loader2 className="h-3 w-3 animate-spin" />}
                            {message.error && <AlertCircle className="h-3 w-3" />}
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>

                        {/* Data Visualization */}
                        {/* Data Visualization */}
                        {message.type === 'bot' && message.dataType === 'chart' && !message.loading && !message.error && message.data && (
                          <div className="mt-2">
                            {/* Chart container with ref */}
                            <div ref={chartRef} className="h-64 w-full bg-white p-2 rounded-lg shadow">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={message.data}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="year" />
                                  <YAxis />
                                  <Tooltip content={<CustomTooltip />} />
                                  <Line type="monotone" dataKey="avg_temp" stroke="#8884d8" name="Temperature" strokeWidth={2} />
                                  {message.data[0]?.avg_salinity && (
                                    <Line type="monotone" dataKey="avg_salinity" stroke="#82ca9d" name="Salinity" strokeWidth={2} />
                                  )}
                                </LineChart>
                              </ResponsiveContainer>
                            </div>

                            {/* Summary */}
                            <div className="mt-2 text-xs text-muted-foreground">
                              Showing {message.data.length} years of data.
                              {message.data[0]?.avg_temp && ` Avg Temp: ${message.data[0].avg_temp.toFixed(2)}°C`}
                              {message.data[0]?.avg_salinity && ` • Avg Salinity: ${message.data[0].avg_salinity.toFixed(2)}`}
                            </div>

                            {/* Download button */}
                            <Button onClick={handleDownloadChart} className="mt-2" size="sm" variant="outline">
                              Download Chart
                            </Button>
                          </div>
                        )}



                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input Area */}
              <div className="border-t border-border/50 p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about ocean data... e.g., 'Show temperature in Arabian Sea'"
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} variant="ocean" disabled={isLoading} className="animate-depth-pulse">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sample Questions */}
            <Card className="shadow-ocean animate-fade-up [animation-delay:200ms] underwater-glow depth-effect hover:animate-depth-pulse">
              <CardHeader>
                <CardTitle className="text-lg">Sample Questions</CardTitle>
                <CardDescription>Try these example queries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sampleQuestions.map((question, index) => (
                  <Button key={index} variant="outline" className="w-full text-left h-auto p-3 text-sm whitespace-normal" onClick={() => handleQuestionClick(question)}>
                    <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" />
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Data Types */}
            <Card className="shadow-ocean animate-fade-up [animation-delay:300ms] underwater-glow depth-effect hover:animate-depth-pulse">
              <CardHeader>
                <CardTitle className="text-lg">Available Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Thermometer, label: "Temperature", color: "text-orange-500" },
                  { icon: Droplets, label: "Salinity", color: "text-blue-500" },
                  { icon: BarChart3, label: "Pressure", color: "text-green-500" },
                  { icon: Globe, label: "Float Positions", color: "text-primary" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <Icon className={`h-4 w-4 ${item.color}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">Live</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* API Status */}
            <Card className="shadow-ocean animate-fade-up [animation-delay:400ms] underwater-glow depth-effect hover:animate-depth-pulse">
              <CardHeader>
                <CardTitle className="text-lg">API Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'FastAPI Backend', status: apiStatus.checking ? 'checking' : apiStatus.connected ? 'Connected' : 'Disconnected' },
                  { label: 'ARGO Database', status: apiStatus.connected ? 'Online' : 'Unknown' },
                  { label: 'AI Processing', status: apiStatus.connected ? 'Ready' : 'Offline' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <Badge variant="secondary" className={`${item.status === 'checking' ? 'bg-yellow-100 text-yellow-800' : item.status === 'Connected' || item.status === 'Online' || item.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.status === 'checking' ? <Loader2 className="h-3 w-3 mr-1 animate-spin inline-block" /> : null}
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
