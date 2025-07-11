export type Car = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  status: 'pending' | 'approved' | 'rejected';
  imageUrl: string;
  location: string;
  submittedBy: string;
  submittedAt: string; 
};

export type LogEntry = {
  admin: string;
  timestamp: string;
  message: string;
};

export interface LogContextType {
  logs: LogEntry[];
  setlogs: React.Dispatch<React.SetStateAction<LogEntry[]>>;
  addLogs: (message: string) => void;
}

