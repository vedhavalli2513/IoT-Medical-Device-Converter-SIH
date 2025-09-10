import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Heart, 
  Thermometer, 
  Activity, 
  Droplet, 
  Wind, 
  Gauge,
  Brain,
  AlertTriangle,
  Stethoscope,
  Waves
} from "lucide-react";

interface VitalSigns {
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
}

interface MultiVitalDisplayProps {
  vitals: VitalSigns;
  patientName: string;
  deviceName: string;
}

export function MultiVitalDisplay({ vitals, patientName, deviceName }: MultiVitalDisplayProps) {
  const getVitalStatus = (type: string, value: any) => {
    switch (type) {
      case 'heartRate':
        if (value < 60) return 'low';
        if (value > 100) return 'high';
        return 'normal';
      case 'systolic':
        if (value < 90) return 'low';
        if (value > 140) return 'high';
        return 'normal';
      case 'temperature':
        if (value < 97.0) return 'low';
        if (value > 99.5) return 'high';
        return 'normal';
      case 'oxygenSaturation':
        if (value < 95) return 'low';
        return 'normal';
      case 'respiratoryRate':
        if (value < 12) return 'low';
        if (value > 20) return 'high';
        return 'normal';
      case 'bloodGlucose':
        if (value < 70) return 'low';
        if (value > 140) return 'high';
        return 'normal';
      default:
        return 'normal';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-blue-500';
      case 'high': return 'text-red-500';
      case 'normal': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{patientName}</CardTitle>
            <p className="text-sm text-muted-foreground">{deviceName}</p>
          </div>
          {vitals.ecgRhythm && (
            <Badge 
              variant={vitals.ecgRhythm === 'normal' ? 'default' : 'destructive'}
              className="gap-1"
            >
              <Waves className="h-3 w-3" />
              {vitals.ecgRhythm}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {vitals.heartRate && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Heart className="h-6 w-6 text-red-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Heart Rate</div>
                <div className={`text-lg ${getStatusColor(getVitalStatus('heartRate', vitals.heartRate))}`}>
                  {vitals.heartRate}
                </div>
                <div className="text-xs text-muted-foreground">bpm</div>
              </div>
            </div>
          )}

          {vitals.bloodPressure && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Gauge className="h-6 w-6 text-blue-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Blood Pressure</div>
                <div className={`text-lg ${getStatusColor(getVitalStatus('systolic', vitals.bloodPressure.systolic))}`}>
                  {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
                </div>
                <div className="text-xs text-muted-foreground">mmHg</div>
                {vitals.bloodPressure.mean && (
                  <div className="text-xs text-muted-foreground">MAP: {vitals.bloodPressure.mean}</div>
                )}
              </div>
            </div>
          )}

          {vitals.temperature && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Thermometer className="h-6 w-6 text-orange-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Temperature</div>
                <div className={`text-lg ${getStatusColor(getVitalStatus('temperature', vitals.temperature))}`}>
                  {vitals.temperature}
                </div>
                <div className="text-xs text-muted-foreground">°F</div>
              </div>
            </div>
          )}

          {vitals.oxygenSaturation && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Droplet className="h-6 w-6 text-blue-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Oxygen Sat</div>
                <div className={`text-lg ${getStatusColor(getVitalStatus('oxygenSaturation', vitals.oxygenSaturation))}`}>
                  {vitals.oxygenSaturation}
                </div>
                <div className="text-xs text-muted-foreground">%</div>
              </div>
            </div>
          )}

          {vitals.respiratoryRate && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Wind className="h-6 w-6 text-green-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Respiratory Rate</div>
                <div className={`text-lg ${getStatusColor(getVitalStatus('respiratoryRate', vitals.respiratoryRate))}`}>
                  {vitals.respiratoryRate}
                </div>
                <div className="text-xs text-muted-foreground">/min</div>
              </div>
            </div>
          )}

          {vitals.bloodGlucose && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Activity className="h-6 w-6 text-purple-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Blood Glucose</div>
                <div className={`text-lg ${getStatusColor(getVitalStatus('bloodGlucose', vitals.bloodGlucose))}`}>
                  {vitals.bloodGlucose}
                </div>
                <div className="text-xs text-muted-foreground">mg/dL</div>
              </div>
            </div>
          )}

          {vitals.painLevel && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Pain Level</div>
                <div className="text-lg text-yellow-500">
                  {vitals.painLevel}
                </div>
                <div className="text-xs text-muted-foreground">/10</div>
              </div>
            </div>
          )}

          {vitals.consciousnessLevel && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Brain className="h-6 w-6 text-teal-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">GCS</div>
                <div className="text-lg text-teal-500">
                  {vitals.consciousnessLevel}
                </div>
                <div className="text-xs text-muted-foreground">/15</div>
              </div>
            </div>
          )}

          {vitals.capnography && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Stethoscope className="h-6 w-6 text-indigo-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">CO2</div>
                <div className="text-lg text-indigo-500">
                  {vitals.capnography}
                </div>
                <div className="text-xs text-muted-foreground">mmHg</div>
              </div>
            </div>
          )}

          {vitals.perfusionIndex && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Droplet className="h-6 w-6 text-cyan-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Perfusion Index</div>
                <div className="text-lg text-cyan-500">
                  {vitals.perfusionIndex}
                </div>
                <div className="text-xs text-muted-foreground">%</div>
              </div>
            </div>
          )}

          {vitals.pulseVariability && (
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Activity className="h-6 w-6 text-pink-500 mb-2" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Pulse Var</div>
                <div className="text-lg text-pink-500">
                  {vitals.pulseVariability}
                </div>
                <div className="text-xs text-muted-foreground">ms</div>
              </div>
            </div>
          )}
        </div>

        {/* Alert indicators */}
        <div className="mt-4 flex flex-wrap gap-2">
          {vitals.heartRate && getVitalStatus('heartRate', vitals.heartRate) !== 'normal' && (
            <Badge className={getStatusBadgeColor(getVitalStatus('heartRate', vitals.heartRate))}>
              Heart Rate: {getVitalStatus('heartRate', vitals.heartRate)}
            </Badge>
          )}
          {vitals.bloodPressure && getVitalStatus('systolic', vitals.bloodPressure.systolic) !== 'normal' && (
            <Badge className={getStatusBadgeColor(getVitalStatus('systolic', vitals.bloodPressure.systolic))}>
              Blood Pressure: {getVitalStatus('systolic', vitals.bloodPressure.systolic)}
            </Badge>
          )}
          {vitals.temperature && getVitalStatus('temperature', vitals.temperature) !== 'normal' && (
            <Badge className={getStatusBadgeColor(getVitalStatus('temperature', vitals.temperature))}>
              Temperature: {getVitalStatus('temperature', vitals.temperature)}
            </Badge>
          )}
          {vitals.oxygenSaturation && getVitalStatus('oxygenSaturation', vitals.oxygenSaturation) !== 'normal' && (
            <Badge className={getStatusBadgeColor(getVitalStatus('oxygenSaturation', vitals.oxygenSaturation))}>
              SpO2: {getVitalStatus('oxygenSaturation', vitals.oxygenSaturation)}
            </Badge>
          )}
          {vitals.ecgRhythm && vitals.ecgRhythm !== 'normal' && (
            <Badge className="bg-red-100 text-red-800">
              ECG Rhythm: {vitals.ecgRhythm}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}