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
    bloodPressure?: string;
    temperature?: number;
    oxygenSaturation?: number;
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
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-red-500" />
              <span>Live Vitals</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {device.vitals.heartRate && (
                <div>
                  <span className="text-muted-foreground">HR:</span> {device.vitals.heartRate} bpm
                </div>
              )}
              {device.vitals.bloodPressure && (
                <div>
                  <span className="text-muted-foreground">BP:</span> {device.vitals.bloodPressure}
                </div>
              )}
              {device.vitals.temperature && (
                <div>
                  <span className="text-muted-foreground">Temp:</span> {device.vitals.temperature}°F
                </div>
              )}
              {device.vitals.oxygenSaturation && (
                <div>
                  <span className="text-muted-foreground">SpO2:</span> {device.vitals.oxygenSaturation}%
                </div>
              )}
            </div>
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