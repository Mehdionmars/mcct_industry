/*
  # Create Core Tables for MCCT Industry Website

  ## Overview
  This migration creates the complete database schema for the MCCT Industry website,
  enabling dynamic content management for all sections.

  ## New Tables

  ### 1. projects
  Stores all construction projects with complete details
  - `id` (uuid, primary key) - Unique project identifier
  - `title` (text) - Project title
  - `industry` (text) - Industry category
  - `scale` (text) - Project scale (small, medium, large)
  - `complexity` (text) - Complexity level
  - `timeline` (text) - Timeline category
  - `featured` (boolean) - Featured project flag
  - `has_virtual_tour` (boolean) - Virtual tour availability
  - `award_winning` (boolean) - Award status
  - `sustainable_build` (boolean) - Sustainability flag
  - `location` (text) - Project location
  - `year` (text) - Completion year
  - `surface` (text) - Surface area
  - `client` (text) - Client name
  - `budget` (text) - Project budget
  - `duration` (text) - Project duration
  - `description` (text) - Detailed description
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. project_images
  Manages multiple images per project
  - `id` (uuid, primary key) - Unique image identifier
  - `project_id` (uuid, foreign key) - Reference to projects table
  - `image_url` (text) - Image URL or path
  - `display_order` (integer) - Image display order
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. services
  Stores all service offerings with comprehensive details
  - `id` (uuid, primary key) - Unique service identifier
  - `title` (text) - Service title
  - `subtitle` (text) - Service subtitle
  - `icon` (text) - Icon name
  - `bg_color` (text) - Background color class
  - `icon_color` (text) - Icon color class
  - `description` (text) - Detailed description
  - `display_order` (integer) - Display order
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. service_stats
  Statistics for each service
  - `id` (uuid, primary key) - Unique stat identifier
  - `service_id` (uuid, foreign key) - Reference to services table
  - `value` (text) - Stat value
  - `label` (text) - Stat label
  - `display_order` (integer) - Display order

  ### 5. service_features
  Features list for each service
  - `id` (uuid, primary key) - Unique feature identifier
  - `service_id` (uuid, foreign key) - Reference to services table
  - `feature` (text) - Feature description
  - `display_order` (integer) - Display order

  ### 6. service_applications
  Applications for each service
  - `id` (uuid, primary key) - Unique application identifier
  - `service_id` (uuid, foreign key) - Reference to services table
  - `application` (text) - Application description
  - `display_order` (integer) - Display order

  ### 7. service_industries
  Industries served by each service
  - `id` (uuid, primary key) - Unique industry identifier
  - `service_id` (uuid, foreign key) - Reference to services table
  - `industry` (text) - Industry name
  - `display_order` (integer) - Display order

  ### 8. service_process_steps
  Process steps for each service
  - `id` (uuid, primary key) - Unique step identifier
  - `service_id` (uuid, foreign key) - Reference to services table
  - `title` (text) - Step title
  - `description` (text) - Step description
  - `display_order` (integer) - Display order

  ### 9. service_specifications
  Technical specifications for services
  - `id` (uuid, primary key) - Unique specification identifier
  - `service_id` (uuid, foreign key) - Reference to services table
  - `category` (text) - Specification category
  - `items` (jsonb) - Specification items as JSON

  ### 10. service_projects
  Project examples for services
  - `id` (uuid, primary key) - Unique project identifier
  - `service_id` (uuid, foreign key) - Reference to services table
  - `name` (text) - Project name
  - `description` (text) - Project description
  - `duration` (text) - Project duration
  - `scale` (text) - Project scale

  ### 11. service_gallery
  Gallery images for services
  - `id` (uuid, primary key) - Unique gallery item identifier
  - `service_id` (uuid, foreign key) - Reference to services table
  - `src` (text) - Image source URL
  - `alt` (text) - Image alt text
  - `display_order` (integer) - Display order

  ### 12. team_members
  Leadership team members
  - `id` (uuid, primary key) - Unique member identifier
  - `name` (text) - Member name
  - `position` (text) - Job position
  - `experience` (text) - Years of experience
  - `image` (text) - Profile image URL
  - `bio` (text) - Biography
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone
  - `expertise` (jsonb) - Expertise areas as JSON array
  - `certifications` (jsonb) - Certifications as JSON array
  - `display_order` (integer) - Display order
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 13. testimonials
  Client testimonials
  - `id` (uuid, primary key) - Unique testimonial identifier
  - `client_name` (text) - Client name
  - `client_position` (text) - Client position
  - `client_company` (text) - Client company
  - `testimonial` (text) - Testimonial content
  - `rating` (integer) - Rating (1-5)
  - `project_type` (text) - Related project type
  - `image` (text) - Client image URL
  - `featured` (boolean) - Featured testimonial flag
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - RLS (Row Level Security) enabled on all tables
  - Public read access for all tables (website content)
  - Authenticated users can manage content

  ## Important Notes
  1. All tables use UUID primary keys for better security
  2. Timestamps are automatically managed
  3. Display order fields enable flexible content ordering
  4. JSONB fields for complex data structures
  5. Foreign keys ensure data integrity
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  industry text NOT NULL,
  scale text NOT NULL,
  complexity text NOT NULL,
  timeline text NOT NULL,
  featured boolean DEFAULT false,
  has_virtual_tour boolean DEFAULT false,
  award_winning boolean DEFAULT false,
  sustainable_build boolean DEFAULT false,
  location text NOT NULL,
  year text NOT NULL,
  surface text NOT NULL,
  client text NOT NULL,
  budget text NOT NULL,
  duration text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL,
  icon text NOT NULL,
  bg_color text NOT NULL,
  icon_color text NOT NULL,
  description text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create service_stats table
CREATE TABLE IF NOT EXISTS service_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  value text NOT NULL,
  label text NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);

-- Create service_features table
CREATE TABLE IF NOT EXISTS service_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  feature text NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);

-- Create service_applications table
CREATE TABLE IF NOT EXISTS service_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  application text NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);

-- Create service_industries table
CREATE TABLE IF NOT EXISTS service_industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  industry text NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);

-- Create service_process_steps table
CREATE TABLE IF NOT EXISTS service_process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);

-- Create service_specifications table
CREATE TABLE IF NOT EXISTS service_specifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  category text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'
);

-- Create service_projects table
CREATE TABLE IF NOT EXISTS service_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  scale text NOT NULL
);

-- Create service_gallery table
CREATE TABLE IF NOT EXISTS service_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  src text NOT NULL,
  alt text NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  experience text DEFAULT '',
  image text DEFAULT '',
  bio text DEFAULT '',
  email text DEFAULT '',
  phone text DEFAULT '',
  expertise jsonb DEFAULT '[]',
  certifications jsonb DEFAULT '[]',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_position text DEFAULT '',
  client_company text DEFAULT '',
  testimonial text NOT NULL,
  rating integer DEFAULT 5,
  project_type text DEFAULT '',
  image text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (website content)
CREATE POLICY "Public can view projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view project images"
  ON project_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view services"
  ON services FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view service stats"
  ON service_stats FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view service features"
  ON service_features FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view service applications"
  ON service_applications FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view service industries"
  ON service_industries FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view service process steps"
  ON service_process_steps FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view service specifications"
  ON service_specifications FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view service projects"
  ON service_projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view service gallery"
  ON service_gallery FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view team members"
  ON team_members FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage project images"
  ON project_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage service stats"
  ON service_stats FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage service features"
  ON service_features FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage service applications"
  ON service_applications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage service industries"
  ON service_industries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage service process steps"
  ON service_process_steps FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage service specifications"
  ON service_specifications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage service projects"
  ON service_projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage service gallery"
  ON service_gallery FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage team members"
  ON team_members FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_industry ON projects(industry);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);