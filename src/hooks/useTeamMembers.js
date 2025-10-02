import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      setTeamMembers(data || []);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { teamMembers, loading, error, refetch: fetchTeamMembers };
};
