interface SecurityCheck {
  name: string;
  status: 'secure' | 'warning' | 'error' | 'checking';
  details: string;
  recommendation?: string;
  category: 'network' | 'privacy' | 'system' | 'authentication';
  tooltip?: string;
}

interface SecurityNotification {
  id: string;
  type: 'score_drop' | 'critical_issue' | 'warning';
  message: string;
  timestamp: Date;
  read: boolean;
}

interface SecurityHistory {
  date: Date;
  score: number;
  issues: {
    critical: number;
    warnings: number;
    secure: number;
  };
}

interface ScheduleConfig {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  lastRun?: Date;
  nextRun?: Date;
}

export type {
  SecurityCheck,
  SecurityNotification,
  SecurityHistory,
  ScheduleConfig
};