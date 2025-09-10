import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { User, Calendar, FileText, Download } from "lucide-react";

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
    bloodPressure: string;
    temperature: number;
    timestamp: string;
  };
}

interface PatientRecordProps {
  patient: Patient;
  onViewFullRecord: (patientId: string) => void;
}

export function PatientRecord({ patient, onViewFullRecord }: PatientRecordProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg">{patient.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {patient.age} years, {patient.gender}
              </p>
            </div>
          </div>
          <Badge className={`${getSeverityColor(patient.severity)} text-white`}>
            {patient.severity}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Condition:</span>
            <p>{patient.condition}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Devices:</span>
            <p>{patient.connectedDevices} connected</p>
          </div>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Latest Vitals</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">HR:</span> {patient.latestVitals.heartRate} bpm
            </div>
            <div>
              <span className="text-muted-foreground">BP:</span> {patient.latestVitals.bloodPressure}
            </div>
            <div>
              <span className="text-muted-foreground">Temp:</span> {patient.latestVitals.temperature}°F
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Updated: {patient.latestVitals.timestamp}
          </p>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Admitted: {patient.admissionDate}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewFullRecord(patient.id)}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-1" />
            Full Record
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}