import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Wifi, Settings, Plus, CheckCircle } from "lucide-react";
import { useState } from "react";

interface DeviceSetupProps {
  onAddDevice: (device: any) => void;
}

export function DeviceSetup({ onAddDevice }: DeviceSetupProps) {
  const [setupStep, setSetupStep] = useState(1);
  const [deviceConfig, setDeviceConfig] = useState({
    name: '',
    type: '',
    serialNumber: '',
    frequency: '1',
    patientId: ''
  });

  const deviceTypes = [
    'Blood Pressure Monitor',
    'Heart Rate Monitor', 
    'Pulse Oximeter',
    'Thermometer',
    'ECG Monitor',
    'Glucose Meter'
  ];

  const handleNext = () => {
    if (setupStep < 4) {
      setSetupStep(setupStep + 1);
    }
  };

  const handleComplete = () => {
    const newDevice = {
      id: `device-${Date.now()}`,
      name: deviceConfig.name,
      type: deviceConfig.type,
      status: 'online' as const,
      lastUpdate: new Date().toLocaleTimeString(),
      vitals: {
        heartRate: Math.floor(Math.random() * 40) + 60,
        bloodPressure: `${Math.floor(Math.random() * 40) + 120}/${Math.floor(Math.random() * 20) + 70}`,
        temperature: (Math.random() * 2 + 97).toFixed(1),
        oxygenSaturation: Math.floor(Math.random() * 5) + 95
      },
      patientId: deviceConfig.patientId,
      patientName: `Patient ${deviceConfig.patientId}`
    };
    
    onAddDevice(newDevice);
    setSetupStep(1);
    setDeviceConfig({
      name: '',
      type: '',
      serialNumber: '',
      frequency: '1',
      patientId: ''
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          IoT Device Setup Wizard
        </CardTitle>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step <= setupStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step < setupStep ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              {step < 4 && <div className={`w-8 h-0.5 ${step < setupStep ? 'bg-primary' : 'bg-muted'}`} />}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {setupStep === 1 && (
          <div className="space-y-4">
            <div className="text-center py-6">
              <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl mb-2">Connect Legacy Medical Device</h3>
              <p className="text-muted-foreground">
                Connect your traditional medical device to our IoT converter to enable smart monitoring and data collection.
              </p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="text-lg mb-2">Setup Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Connect the medical device probe to the IoT converter input</li>
                <li>Connect the IoT converter output to your legacy device</li>
                <li>Power on both devices and wait for connection</li>
                <li>Configure device settings in this wizard</li>
              </ol>
            </div>
          </div>
        )}

        {setupStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl">Device Configuration</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deviceName">Device Name</Label>
                <Input
                  id="deviceName"
                  placeholder="e.g., Ward A - Monitor 1"
                  value={deviceConfig.name}
                  onChange={(e) => setDeviceConfig({...deviceConfig, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deviceType">Device Type</Label>
                <Select value={deviceConfig.type} onValueChange={(value) => setDeviceConfig({...deviceConfig, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviceTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  placeholder="Enter device serial number"
                  value={deviceConfig.serialNumber}
                  onChange={(e) => setDeviceConfig({...deviceConfig, serialNumber: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency">Data Frequency (seconds)</Label>
                <Select value={deviceConfig.frequency} onValueChange={(value) => setDeviceConfig({...deviceConfig, frequency: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 second</SelectItem>
                    <SelectItem value="5">5 seconds</SelectItem>
                    <SelectItem value="10">10 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {setupStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl">Patient Assignment</h3>
            
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                placeholder="Enter patient ID"
                value={deviceConfig.patientId}
                onChange={(e) => setDeviceConfig({...deviceConfig, patientId: e.target.value})}
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="text-sm">Privacy & Security</h4>
              <p className="text-sm text-muted-foreground mt-1">
                All patient data is encrypted and stored securely. Device connections use secure protocols to ensure data integrity.
              </p>
            </div>
          </div>
        )}

        {setupStep === 4 && (
          <div className="space-y-4">
            <div className="text-center py-6">
              <Wifi className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-xl mb-2">Connection Established</h3>
              <p className="text-muted-foreground">
                Your legacy medical device is now IoT-enabled and ready for monitoring.
              </p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <h4 className="text-lg">Device Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span> {deviceConfig.name}
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span> {deviceConfig.type}
                </div>
                <div>
                  <span className="text-muted-foreground">Serial:</span> {deviceConfig.serialNumber}
                </div>
                <div>
                  <span className="text-muted-foreground">Patient:</span> {deviceConfig.patientId}
                </div>
              </div>
              <Badge className="bg-green-500 text-white">
                Ready for Monitoring
              </Badge>
            </div>
          </div>
        )}

        <Separator />
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setSetupStep(Math.max(1, setupStep - 1))}
            disabled={setupStep === 1}
          >
            Previous
          </Button>
          
          {setupStep < 4 ? (
            <Button 
              onClick={handleNext}
              disabled={
                (setupStep === 2 && (!deviceConfig.name || !deviceConfig.type)) ||
                (setupStep === 3 && !deviceConfig.patientId)
              }
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
              Complete Setup
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}