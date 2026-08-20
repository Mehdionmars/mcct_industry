import usePageMeta from '../../hooks/usePageMeta';

/**
 * Renseigne titre, description, canonique et cartes de partage de la page.
 * N'affiche rien.
 */
const PageMeta = ({ title, description, image }) => {
  usePageMeta(title, description, image);
  return null;
};

export default PageMeta;
