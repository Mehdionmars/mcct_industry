import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (servicesError) throw servicesError;

      const servicesWithDetails = await Promise.all(
        servicesData.map(async (service) => {
          const [stats, features, applications, industries, processSteps, specifications, projects, gallery] = await Promise.all([
            supabase.from('service_stats').select('*').eq('service_id', service.id).order('display_order'),
            supabase.from('service_features').select('*').eq('service_id', service.id).order('display_order'),
            supabase.from('service_applications').select('*').eq('service_id', service.id).order('display_order'),
            supabase.from('service_industries').select('*').eq('service_id', service.id).order('display_order'),
            supabase.from('service_process_steps').select('*').eq('service_id', service.id).order('display_order'),
            supabase.from('service_specifications').select('*').eq('service_id', service.id),
            supabase.from('service_projects').select('*').eq('service_id', service.id),
            supabase.from('service_gallery').select('*').eq('service_id', service.id).order('display_order')
          ]);

          return {
            id: service.id,
            title: service.title,
            subtitle: service.subtitle,
            icon: service.icon,
            bgColor: service.bg_color,
            iconColor: service.icon_color,
            description: service.description,
            stats: stats.data || [],
            features: features.data?.map(f => f.feature) || [],
            applications: applications.data?.map(a => a.application) || [],
            industries: industries.data?.map(i => i.industry) || [],
            process: processSteps.data || [],
            specifications: specifications.data || [],
            projects: projects.data || [],
            gallery: gallery.data || []
          };
        })
      );

      setServices(servicesWithDetails);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { services, loading, error, refetch: fetchServices };
};
