import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GlassmorphismCard } from "@/components/GlassmorphismCard";
import SoundwaveAnimation from "@/components/SoundwaveAnimation";
import { apiClient } from "@/lib/api";
import { 
  MessageSquare, 
  Send, 
  BarChart3, 
  MapPin, 
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

  const sampleQuestions = [
    "Show salinity in Arabian Sea, March 2023",
    "Temperature trends in North Atlantic",
    "Compare Pacific vs Atlantic temperatures",
    "ARGO float positions near Australia",
    "Ocean depth profiles for the Mediterranean"
  ];

  // Check API status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await apiClient.healthCheck();
        setApiStatus({ connected: true, checking: false });
      } catch (error) {
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

    // Add loading message
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
      // Call the FastAPI natural language query endpoint
      const response = await apiClient.naturalLanguageQuery(inputValue);
      
      if (response.error) {
        throw new Error(response.error);
      }

      const botResponse: Message = {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: `I found ${response.results.length} data points. Here's the visualization based on your query.`,
        timestamp: new Date(),
        dataType: inputValue.toLowerCase().includes('compare') ? 'chart' : 
                  inputValue.toLowerCase().includes('position') || inputValue.toLowerCase().includes('location') ? 'map' : 'chart',
        data: response.results
      };

      // Replace loading message with actual response
      setMessages(prev => prev.slice(0, -1).concat(botResponse));

    } catch (error) {
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

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
  };

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

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' ? 'bg-primary' : 'gradient-ocean'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>

                      {/* Message Content */}
                      <div className={`space-y-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-3 rounded-lg transition-smooth ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground shadow-ocean' 
                            : message.error 
                              ? 'bg-destructive/10 border border-destructive/20 text-destructive'
                              : 'bg-muted border border-border/50 underwater-glow'
                        }`}>
                          <div className="flex items-center gap-2">
                            {message.loading && <Loader2 className="h-3 w-3 animate-spin" />}
                            {message.error && <AlertCircle className="h-3 w-3" />}
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>

                        {/* Data Visualization Preview */}
                        {message.type === 'bot' && message.dataType && !message.loading && !message.error && (
                          <div className="bg-background border border-border/50 rounded-lg p-4 mt-2 depth-effect">
                            <div className="h-40 gradient-surface rounded-lg flex flex-col items-center justify-center space-y-2">
                              {message.dataType === 'chart' && (
                                <div className="text-center animate-float">
                                  <BarChart3 className="h-10 w-10 text-secondary-dark mx-auto mb-2 opacity-70" />
                                  <p className="text-secondary-dark text-sm font-medium">Generated Chart</p>
                                  {message.data && (
                                    <p className="text-xs text-secondary-dark/70 mt-1">
                                      {message.data.length} data points
                                    </p>
                                  )}
                                </div>
                              )}
                              {message.dataType === 'map' && (
                                <div className="text-center animate-float">
                                  <MapPin className="h-10 w-10 text-secondary-dark mx-auto mb-2 opacity-70" />
                                  <p className="text-secondary-dark text-sm font-medium">Interactive Map</p>
                                  {message.data && (
                                    <p className="text-xs text-secondary-dark/70 mt-1">
                                      Showing {message.data.length} locations
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
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
                  <Button 
                    onClick={handleSendMessage} 
                    variant="ocean" 
                    disabled={isLoading}
                    className="animate-depth-pulse"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
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
                <CardDescription>
                  Try these example queries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left h-auto p-3 text-sm whitespace-normal"
                    onClick={() => handleQuestionClick(question)}
                  >
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
                <div className="flex items-center justify-between">
                  <span className="text-sm">FastAPI Backend</span>
                  {apiStatus.checking ? (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      Checking
                    </Badge>
                  ) : (
                    <Badge 
                      variant="secondary" 
                      className={apiStatus.connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {apiStatus.connected ? 'Connected' : 'Disconnected'}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ARGO Database</span>
                  <Badge 
                    variant="secondary" 
                    className={apiStatus.connected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {apiStatus.connected ? 'Online' : 'Unknown'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Processing</span>
                  <Badge 
                    variant="secondary" 
                    className={apiStatus.connected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {apiStatus.connected ? 'Ready' : 'Offline'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;