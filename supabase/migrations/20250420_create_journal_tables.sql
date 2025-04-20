-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create journals table
CREATE TABLE IF NOT EXISTS public.journals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  reading_id UUID REFERENCES public.readings,
  mood TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create journal_tags table
CREATE TABLE IF NOT EXISTS public.journal_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(name, user_id)
);

-- Create journal_tag_mappings junction table
CREATE TABLE IF NOT EXISTS public.journal_tag_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journal_id UUID REFERENCES public.journals ON DELETE CASCADE,
  tag_id UUID REFERENCES public.journal_tags ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(journal_id, tag_id)
);

-- Check if updated_at trigger function exists, if not create it
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger for journals table
CREATE TRIGGER update_journals_updated_at
BEFORE UPDATE ON public.journals
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Enable Row Level Security on all tables
ALTER TABLE public.journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_tag_mappings ENABLE ROW LEVEL SECURITY;

-- Create policies for journals table
CREATE POLICY "Users can read their own journals"
  ON public.journals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own journals"
  ON public.journals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journals"
  ON public.journals
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journals"
  ON public.journals
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for journal_tags table
CREATE POLICY "Users can read their own journal tags"
  ON public.journal_tags
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own journal tags"
  ON public.journal_tags
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journal tags"
  ON public.journal_tags
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journal tags"
  ON public.journal_tags
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for journal_tag_mappings table
CREATE POLICY "Users can read their own journal tag mappings"
  ON public.journal_tag_mappings
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.journals
      WHERE journals.id = journal_tag_mappings.journal_id
      AND journals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert journal tag mappings for their journals"
  ON public.journal_tag_mappings
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.journals
      WHERE journals.id = journal_tag_mappings.journal_id
      AND journals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own journal tag mappings"
  ON public.journal_tag_mappings
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.journals
      WHERE journals.id = journal_tag_mappings.journal_id
      AND journals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own journal tag mappings"
  ON public.journal_tag_mappings
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.journals
      WHERE journals.id = journal_tag_mappings.journal_id
      AND journals.user_id = auth.uid()
    )
  );

-- Create indices for faster queries
CREATE INDEX journals_user_id_idx ON public.journals (user_id);
CREATE INDEX journals_reading_id_idx ON public.journals (reading_id);
CREATE INDEX journal_tags_user_id_idx ON public.journal_tags (user_id);
CREATE INDEX journal_tag_mappings_journal_id_idx ON public.journal_tag_mappings (journal_id);
CREATE INDEX journal_tag_mappings_tag_id_idx ON public.journal_tag_mappings (tag_id);
