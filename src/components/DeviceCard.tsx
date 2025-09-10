import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Activity, Wifi, WifiOff, Settings, Eye } from "lucide-react";

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

interface DeviceCardProps {
  device: Device;
  onViewDetails: (device: Device) => void;
  onConfigure: (device: Device) => void;
}

export function DeviceCard({ device, onViewDetails, onConfigure }: DeviceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'online' ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{device.name}</CardTitle>
          <div className="flex items-center gap-2">
            {getStatusIcon(device.status)}
            <Badge className={`${getStatusColor(device.status)} text-white`}>
              {device.status}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{device.type}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {device.patientName && (
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm">
              <span className="text-muted-foreground">Patient:</span> {device.patientName}
            </p>
            <p className="text-xs text-muted-foreground">ID: {device.patientId}</p>
          </div>
        )}
        
        {device.status === 'online' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4 text-red-500" />
                <span>Live Vitals</span>
              </div>
              {device.vitals.ecgRhythm && (
                <Badge variant={device.vitals.ecgRhythm === 'normal' ? 'default' : 'destructive'} className="text-xs">
                  {device.vitals.ecgRhythm}
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              {device.vitals.heartRate && (
                <div>
                  <span className="text-muted-foreground">HR:</span> 
                  <span className="text-red-500 ml-1">{device.vitals.heartRate} bpm</span>
                </div>
              )}
              {device.vitals.bloodPressure && (
                <div>
                  <span className="text-muted-foreground">BP:</span> 
                  <span className="text-blue-500 ml-1">
                    {device.vitals.bloodPressure.systolic}/{device.vitals.bloodPressure.diastolic}
                  </span>
                </div>
              )}
              {device.vitals.temperature && (
                <div>
                  <span className="text-muted-foreground">Temp:</span> 
                  <span className="text-orange-500 ml-1">{device.vitals.temperature}°F</span>
                </div>
              )}
              {device.vitals.oxygenSaturation && (
                <div>
                  <span className="text-muted-foreground">SpO2:</span> 
                  <span className="text-blue-500 ml-1">{device.vitals.oxygenSaturation}%</span>
                </div>
              )}
              {device.vitals.respiratoryRate && (
                <div>
                  <span className="text-muted-foreground">RR:</span> 
                  <span className="text-green-500 ml-1">{device.vitals.respiratoryRate}/min</span>
                </div>
              )}
              {device.vitals.bloodGlucose && (
                <div>
                  <span className="text-muted-foreground">Glucose:</span> 
                  <span className="text-purple-500 ml-1">{device.vitals.bloodGlucose} mg/dL</span>
                </div>
              )}
            </div>

            {(device.vitals.painLevel || device.vitals.consciousnessLevel || device.vitals.capnography) && (
              <div className="border-t pt-2 grid grid-cols-3 gap-2 text-xs">
                {device.vitals.painLevel && (
                  <div className="text-center">
                    <div className="text-muted-foreground">Pain</div>
                    <div className="text-yellow-500">{device.vitals.painLevel}/10</div>
                  </div>
                )}
                {device.vitals.consciousnessLevel && (
                  <div className="text-center">
                    <div className="text-muted-foreground">GCS</div>
                    <div className="text-teal-500">{device.vitals.consciousnessLevel}/15</div>
                  </div>
                )}
                {device.vitals.capnography && (
                  <div className="text-center">
                    <div className="text-muted-foreground">CO2</div>
                    <div className="text-indigo-500">{device.vitals.capnography}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          Last update: {device.lastUpdate}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(device)} className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={() => onConfigure(device)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}