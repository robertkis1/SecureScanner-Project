import { supabase } from '../lib/supabase';
import { SecurityCheck } from '../types/security';

interface SecurityLog {
  score: number;
  issues: {
    critical: number;
    warnings: number;
    secure: number;
  };
  checkCategories: {
    [key in SecurityCheck['category']]: {
      secure: number;
      warning: number;
      error: number;
    };
  };
  checks: SecurityCheck[];
  timestamp: Date;
}

export const useSecurityLog = () => {
  const saveSecurityLog = async (
    score: number,
    checks: SecurityCheck[]
  ): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const issues = {
        critical: checks.filter(c => c.status === 'error').length,
        warnings: checks.filter(c => c.status === 'warning').length,
        secure: checks.filter(c => c.status === 'secure').length
      };

      // Calculate counts by category
      const checkCategories = checks.reduce((acc, check) => {
        if (!acc[check.category]) {
          acc[check.category] = { secure: 0, warning: 0, error: 0 };
        }
        acc[check.category][check.status === 'secure' ? 'secure' : 
                          check.status === 'warning' ? 'warning' : 'error']++;
        return acc;
      }, {} as SecurityLog['checkCategories']);

      // Save to security_history
      const { error: historyError } = await supabase
        .from('security_history')
        .insert({
          user_id: user.id,
          score,
          issues,
          check_categories: checkCategories
        });

      if (historyError) throw historyError;

      // Create notifications for critical issues
      const criticalChecks = checks.filter(c => c.status === 'error');
      if (criticalChecks.length > 0) {
        const { error: notificationError } = await supabase
          .from('security_notifications')
          .insert({
            user_id: user.id,
            type: 'critical_issue',
            message: `Found ${criticalChecks.length} critical security issues that need attention.`
          });

        if (notificationError) throw notificationError;
      }

      // Check for significant score drops
      const { data: lastCheck } = await supabase
        .from('security_history')
        .select('score')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(2);

      if (lastCheck && lastCheck.length > 1) {
        const previousScore = lastCheck[1].score;
        if (score < previousScore - 10) {
          const { error: scoreDropError } = await supabase
            .from('security_notifications')
            .insert({
              user_id: user.id,
              type: 'score_drop',
              message: `Security score dropped from ${previousScore}% to ${score}%.`
            });

          if (scoreDropError) throw scoreDropError;
        }
      }
    } catch (error) {
      console.error('Failed to save security log:', error);
      throw error;
    }
  };

  const getSecurityHistory = async (): Promise<SecurityLog[]> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('security_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(log => ({
        score: log.score,
        issues: log.issues,
        checkCategories: log.check_categories || {
          network: { secure: 0, warning: 0, error: 0 },
          privacy: { secure: 0, warning: 0, error: 0 },
          system: { secure: 0, warning: 0, error: 0 },
          authentication: { secure: 0, warning: 0, error: 0 }
        },
        checks: [], // Historical check details not stored for privacy
        timestamp: new Date(log.created_at)
      }));
    } catch (error) {
      console.error('Failed to fetch security history:', error);
      throw error;
    }
  };

  return {
    saveSecurityLog,
    getSecurityHistory
  };
};