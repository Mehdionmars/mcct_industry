import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setTestimonials(data || []);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { testimonials, loading, error, refetch: fetchTestimonials };
};
