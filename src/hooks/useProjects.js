import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      const projectsWithImages = await Promise.all(
        projectsData.map(async (project) => {
          const { data: images, error: imagesError } = await supabase
            .from('project_images')
            .select('*')
            .eq('project_id', project.id)
            .order('display_order', { ascending: true });

          if (imagesError) {
            console.error('Error fetching images:', imagesError);
            return { ...project, images: [] };
          }

          return {
            ...project,
            images: images.map(img => img.image_url)
          };
        })
      );

      setProjects(projectsWithImages);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { projects, loading, error, refetch: fetchProjects };
};
