import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { DeviceCard } from "./components/DeviceCard";
import { VitalChart } from "./components/VitalChart";
import { PatientRecord } from "./components/PatientRecord";
import { DeviceSetup } from "./components/DeviceSetup";
import { MultiVitalDisplay } from "./components/MultiVitalDisplay";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { 
  Activity, 
  Wifi, 
  Users, 
  Settings, 
  Heart, 
  Thermometer,
  Plus,
  BarChart3,
  Shield,
  Clock,
  Sun,
  Moon
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastUpdate: string;
  vitals: {
    heartRate?: number;
    bloodPressure?: {
      systolic: number;
      diastolic: number;
      mean?: number;
    };
    temperature?: number;
    oxygenSaturation?: number;
    respiratoryRate?: number;
    bloodGlucose?: number;
    painLevel?: number;
    consciousnessLevel?: number;
    capnography?: number;
    perfusionIndex?: number;
    pulseVariability?: number;
    ecgRhythm?: 'normal' | 'arrhythmia' | 'tachycardia' | 'bradycardia';
  };
  patientId?: string;
  patientName?: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  admissionDate: string;
  connectedDevices: number;
  latestVitals: {
    heartRate: number;
    bloodPressure: {
      systolic: number;
      diastolic: number;
      mean?: number;
    };
    temperature: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    bloodGlucose?: number;
    painLevel?: number;
    consciousnessLevel?: number;
    timestamp: string;
  };
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'dev-001',
      name: 'Ward A - Multiparameter Monitor',
      type: 'Multiparameter Monitor',
      status: 'online',
      lastUpdate: '2 minutes ago',
      vitals: {
        heartRate: 72,
        bloodPressure: {
          systolic: 120,
          diastolic: 80,
          mean: 93
        },
        temperature: 98.6,
        oxygenSaturation: 98,
        respiratoryRate: 16,
        bloodGlucose: 95,
        painLevel: 3,
        consciousnessLevel: 15,
        capnography: 35,
        perfusionIndex: 1.2,
        pulseVariability: 8,
        ecgRhythm: 'normal'
      },
      patientId: 'PAT-001',
      patientName: 'John Smith'
    },
    {
      id: 'dev-002',
      name: 'ICU - Critical Care Monitor',
      type: 'Multiparameter Monitor',
      status: 'online',
      lastUpdate: '1 minute ago',
      vitals: {
        heartRate: 84,
        bloodPressure: {
          systolic: 130,
          diastolic: 85,
          mean: 100
        },
        temperature: 99.1,
        oxygenSaturation: 97,
        respiratoryRate: 18,
        bloodGlucose: 110,
        painLevel: 5,
        consciousnessLevel: 14,
        capnography: 38,
        perfusionIndex: 0.9,
        pulseVariability: 12,
        ecgRhythm: 'arrhythmia'
      },
      patientId: 'PAT-002',
      patientName: 'Sarah Johnson'
    },
    {
      id: 'dev-003',
      name: 'Emergency - Portable Monitor',
      type: 'Multiparameter Monitor',
      status: 'maintenance',
      lastUpdate: '1 hour ago',
      vitals: {},
      patientId: 'PAT-003',
      patientName: 'Mike Wilson'
    }
  ]);

  const [patients] = useState<Patient[]>([
    {
      id: 'PAT-001',
      name: 'John Smith',
      age: 65,
      gender: 'Male',
      condition: 'Hypertension',
      severity: 'medium',
      admissionDate: '2024-01-15',
      connectedDevices: 2,
      latestVitals: {
        heartRate: 72,
        bloodPressure: {
          systolic: 120,
          diastolic: 80,
          mean: 93
        },
        temperature: 98.6,
        respiratoryRate: 16,
        oxygenSaturation: 98,
        bloodGlucose: 95,
        painLevel: 3,
        consciousnessLevel: 15,
        timestamp: '2 minutes ago'
      }
    },
    {
      id: 'PAT-002',
      name: 'Sarah Johnson',
      age: 42,
      gender: 'Female',
      condition: 'Cardiac Arrhythmia',
      severity: 'high',
      admissionDate: '2024-01-18',
      connectedDevices: 1,
      latestVitals: {
        heartRate: 84,
        bloodPressure: {
          systolic: 130,
          diastolic: 85,
          mean: 100
        },
        temperature: 99.1,
        respiratoryRate: 18,
        oxygenSaturation: 97,
        bloodGlucose: 110,
        painLevel: 5,
        consciousnessLevel: 14,
        timestamp: '1 minute ago'
      }
    },
    {
      id: 'PAT-003',
      name: 'Mike Wilson',
      age: 58,
      gender: 'Male',
      condition: 'Post-Surgery Recovery',
      severity: 'low',
      admissionDate: '2024-01-20',
      connectedDevices: 1,
      latestVitals: {
        heartRate: 68,
        bloodPressure: {
          systolic: 115,
          diastolic: 75,
          mean: 88
        },
        temperature: 98.2,
        respiratoryRate: 14,
        oxygenSaturation: 99,
        bloodGlucose: 88,
        painLevel: 2,
        consciousnessLevel: 15,
        timestamp: '5 minutes ago'
      }
    }
  ]);

  // Mock real-time data for charts
  const [heartRateData, setHeartRateData] = useState([
    { time: '10:00', value: 72 },
    { time: '10:05', value: 74 },
    { time: '10:10', value: 71 },
    { time: '10:15', value: 73 },
    { time: '10:20', value: 70 },
    { time: '10:25', value: 72 },
  ]);

  const [temperatureData, setTemperatureData] = useState([
    { time: '10:00', value: 98.6 },
    { time: '10:05', value: 98.7 },
    { time: '10:10', value: 98.5 },
    { time: '10:15', value: 98.8 },
    { time: '10:20', value: 98.6 },
    { time: '10:25', value: 98.7 },
  ]);

  const [respiratoryData, setRespiratoryData] = useState([
    { time: '10:00', value: 16 },
    { time: '10:05', value: 17 },
    { time: '10:10', value: 15 },
    { time: '10:15', value: 16 },
    { time: '10:20', value: 18 },
    { time: '10:25', value: 16 },
  ]);

  const [bloodPressureData, setBloodPressureData] = useState([
    { time: '10:00', systolic: 120, diastolic: 80 },
    { time: '10:05', systolic: 122, diastolic: 82 },
    { time: '10:10', systolic: 118, diastolic: 78 },
    { time: '10:15', systolic: 125, diastolic: 85 },
    { time: '10:20', systolic: 121, diastolic: 79 },
    { time: '10:25', systolic: 120, diastolic: 80 },
  ]);

  const [oxygenSaturationData, setOxygenSaturationData] = useState([
    { time: '10:00', value: 98 },
    { time: '10:05', value: 97 },
    { time: '10:10', value: 99 },
    { time: '10:15', value: 98 },
    { time: '10:20', value: 96 },
    { time: '10:25', value: 98 },
  ]);

  const [bloodGlucoseData, setBloodGlucoseData] = useState([
    { time: '10:00', value: 95 },
    { time: '10:05', value: 98 },
    { time: '10:10', value: 92 },
    { time: '10:15', value: 97 },
    { time: '10:20', value: 94 },
    { time: '10:25', value: 95 },
  ]);

  // Theme management
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      setHeartRateData(prev => [
        ...prev.slice(1),
        { time: timeStr, value: Math.floor(Math.random() * 20) + 65 }
      ]);
      
      setTemperatureData(prev => [
        ...prev.slice(1),
        { time: timeStr, value: parseFloat((Math.random() * 2 + 98.0).toFixed(1)) }
      ]);

      setRespiratoryData(prev => [
        ...prev.slice(1),
        { time: timeStr, value: Math.floor(Math.random() * 6) + 14 }
      ]);

      setBloodPressureData(prev => [
        ...prev.slice(1),
        { 
          time: timeStr, 
          systolic: Math.floor(Math.random() * 20) + 110,
          diastolic: Math.floor(Math.random() * 15) + 70
        }
      ]);

      setOxygenSaturationData(prev => [
        ...prev.slice(1),
        { time: timeStr, value: Math.floor(Math.random() * 4) + 96 }
      ]);

      setBloodGlucoseData(prev => [
        ...prev.slice(1),
        { time: timeStr, value: Math.floor(Math.random() * 20) + 85 }
      ]);
      
      // Update device vitals
      setDevices(prevDevices => 
        prevDevices.map(device => ({
          ...device,
          vitals: device.status === 'online' ? {
            ...device.vitals,
            heartRate: Math.floor(Math.random() * 20) + 65,
            bloodPressure: {
              systolic: Math.floor(Math.random() * 20) + 110,
              diastolic: Math.floor(Math.random() * 15) + 70,
              mean: Math.floor(Math.random() * 15) + 85
            },
            temperature: parseFloat((Math.random() * 2 + 98.0).toFixed(1)),
            oxygenSaturation: Math.floor(Math.random() * 4) + 96,
            respiratoryRate: Math.floor(Math.random() * 6) + 14,
            bloodGlucose: Math.floor(Math.random() * 20) + 85,
            capnography: Math.floor(Math.random() * 10) + 30,
            perfusionIndex: parseFloat((Math.random() * 1 + 0.5).toFixed(1)),
            pulseVariability: Math.floor(Math.random() * 10) + 5
          } : device.vitals,
          lastUpdate: device.status === 'online' ? 'Just now' : device.lastUpdate
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const totalPatients = patients.length;
  const activeAlerts = patients.filter(p => p.severity === 'high' || p.severity === 'critical').length;

  const handleViewDetails = (device: Device) => {
    console.log('Viewing details for device:', device.id);
  };

  const handleConfigure = (device: Device) => {
    console.log('Configuring device:', device.id);
  };

  const handleViewFullRecord = (patientId: string) => {
    console.log('Viewing full record for patient:', patientId);
  };

  const handleAddDevice = (newDevice: Device) => {
    setDevices(prev => [...prev, newDevice]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl">IoT Medical Converter</h1>
                <p className="text-sm text-muted-foreground">
                  Transform legacy medical devices into smart IoT systems
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                Live Monitoring
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Shield className="h-3 w-3" />
                HIPAA Compliant
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="gap-2"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="h-4 w-4" />
                    <span className="hidden sm:inline">Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4" />
                    <span className="hidden sm:inline">Light</span>
                  </>
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Wifi className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Online Devices</p>
                  <p className="text-2xl">{onlineDevices}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Patients</p>
                  <p className="text-2xl">{totalPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl">{activeAlerts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Points Today</p>
                  <p className="text-2xl">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
            <TabsTrigger value="setup">Device Setup</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center py-8">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1716101597874-5557adc7a434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZGV2aWNlJTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NTc0NDA0MTd8MA&ixlib=rb-4.0.1&q=80&w=400"
                      alt="Medical Device Monitoring"
                      className="rounded-lg shadow-sm max-w-full h-auto"
                    />
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="text-lg mb-2">IoT Converter Benefits</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Convert any legacy medical device to IoT</li>
                      <li>• Real-time data streaming and monitoring</li>
                      <li>• Automated electronic health records</li>
                      <li>• HIPAA-compliant data security</li>
                      <li>• Remote monitoring capabilities</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span>Ward A Monitor connected to Patient John S.</span>
                      <span className="text-muted-foreground ml-auto">2m ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <span>New vital signs recorded for Patient Sarah J.</span>
                      <span className="text-muted-foreground ml-auto">5m ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <span>Device maintenance scheduled for ICU Monitor</span>
                      <span className="text-muted-foreground ml-auto">1h ago</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Device
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      System Configuration
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onViewDetails={handleViewDetails}
                  onConfigure={handleConfigure}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.map((patient) => (
                <PatientRecord
                  key={patient.id}
                  patient={patient}
                  onViewFullRecord={handleViewFullRecord}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <VitalChart
                title="Heart Rate"
                data={heartRateData}
                color="#ef4444"
                unit="bpm"
                currentValue={heartRateData[heartRateData.length - 1]?.value}
              />
              <VitalChart
                title="Body Temperature"
                data={temperatureData}
                color="#f97316"
                unit="°F"
                currentValue={temperatureData[temperatureData.length - 1]?.value}
              />
              <VitalChart
                title="Respiratory Rate"
                data={respiratoryData}
                color="#10b981"
                unit="breaths/min"
                currentValue={respiratoryData[respiratoryData.length - 1]?.value}
              />
              <VitalChart
                title="Oxygen Saturation"
                data={oxygenSaturationData}
                color="#3b82f6"
                unit="%"
                currentValue={oxygenSaturationData[oxygenSaturationData.length - 1]?.value}
              />
              <VitalChart
                title="Blood Glucose"
                data={bloodGlucoseData}
                color="#8b5cf6"
                unit="mg/dL"
                currentValue={bloodGlucoseData[bloodGlucoseData.length - 1]?.value}
              />
              <div className="lg:col-span-2 xl:col-span-1">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Blood Pressure</CardTitle>
                      <div className="text-right">
                        <div className="text-2xl text-red-500">
                          {bloodPressureData[bloodPressureData.length - 1]?.systolic}/
                          {bloodPressureData[bloodPressureData.length - 1]?.diastolic}
                        </div>
                        <div className="text-sm text-muted-foreground">mmHg</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={bloodPressureData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis 
                            dataKey="time" 
                            tick={{ fontSize: 12 }}
                            className="stroke-muted-foreground"
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            className="stroke-muted-foreground"
                          />
                          <Tooltip 
                            labelFormatter={(value) => `Time: ${value}`}
                            formatter={(value, name) => [
                              `${value} mmHg`, 
                              name === 'systolic' ? 'Systolic' : 'Diastolic'
                            ]}
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                              color: 'hsl(var(--card-foreground))'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="systolic" 
                            stroke="#ef4444" 
                            strokeWidth={2}
                            dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                            name="systolic"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="diastolic" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                            name="diastolic"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Full Multiparameter Display for Featured Patient */}
            {devices.filter(d => d.status === 'online').length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl">Featured Patient Monitor</h3>
                <MultiVitalDisplay
                  vitals={devices.filter(d => d.status === 'online')[0].vitals}
                  patientName={devices.filter(d => d.status === 'online')[0].patientName || 'Unknown Patient'}
                  deviceName={devices.filter(d => d.status === 'online')[0].name}
                />
              </div>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Live Device Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {devices.filter(d => d.status === 'online').map((device) => (
                    <div key={device.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span>{device.name}</span>
                        </div>
                        {device.vitals.ecgRhythm && (
                          <Badge variant={device.vitals.ecgRhythm === 'normal' ? 'default' : 'destructive'}>
                            {device.vitals.ecgRhythm}
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
                        {device.vitals.heartRate && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">HR</div>
                            <div className="text-red-500">{device.vitals.heartRate} bpm</div>
                          </div>
                        )}
                        {device.vitals.bloodPressure && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">BP</div>
                            <div className="text-blue-500">
                              {device.vitals.bloodPressure.systolic}/{device.vitals.bloodPressure.diastolic}
                            </div>
                          </div>
                        )}
                        {device.vitals.temperature && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Temp</div>
                            <div className="text-orange-500">{device.vitals.temperature}°F</div>
                          </div>
                        )}
                        {device.vitals.oxygenSaturation && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">SpO2</div>
                            <div className="text-blue-500">{device.vitals.oxygenSaturation}%</div>
                          </div>
                        )}
                        {device.vitals.respiratoryRate && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">RR</div>
                            <div className="text-green-500">{device.vitals.respiratoryRate}/min</div>
                          </div>
                        )}
                        {device.vitals.bloodGlucose && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Glucose</div>
                            <div className="text-purple-500">{device.vitals.bloodGlucose} mg/dL</div>
                          </div>
                        )}
                        {device.vitals.painLevel && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Pain</div>
                            <div className="text-yellow-500">{device.vitals.painLevel}/10</div>
                          </div>
                        )}
                        {device.vitals.consciousnessLevel && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">GCS</div>
                            <div className="text-teal-500">{device.vitals.consciousnessLevel}/15</div>
                          </div>
                        )}
                        {device.vitals.capnography && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">CO2</div>
                            <div className="text-indigo-500">{device.vitals.capnography} mmHg</div>
                          </div>
                        )}
                        {device.vitals.perfusionIndex && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">PI</div>
                            <div className="text-cyan-500">{device.vitals.perfusionIndex}%</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="space-y-6">
            <DeviceSetup onAddDevice={handleAddDevice} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}