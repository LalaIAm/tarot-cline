-- Create tarot readings table
CREATE TABLE IF NOT EXISTS public.readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  question TEXT,
  spread_type TEXT NOT NULL,
  reading_data JSONB NOT NULL,
  interpretation JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create junction table for reading cards (optional, based on data modeling approach)
CREATE TABLE IF NOT EXISTS public.reading_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reading_id UUID REFERENCES public.readings ON DELETE CASCADE,
  card_name TEXT NOT NULL,
  position TEXT NOT NULL,
  orientation TEXT NOT NULL,
  position_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add updated_at trigger for readings table
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_readings_updated_at
BEFORE UPDATE ON public.readings
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Create Row Level Security policies
-- Enable RLS on tables
ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_cards ENABLE ROW LEVEL SECURITY;

-- Create policies for readings table
CREATE POLICY "Users can read their own readings"
  ON public.readings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own readings"
  ON public.readings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own readings"
  ON public.readings
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own readings"
  ON public.readings
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for reading_cards table
CREATE POLICY "Users can read their own reading cards"
  ON public.reading_cards
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.readings
      WHERE readings.id = reading_cards.reading_id
      AND readings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert reading cards for their readings"
  ON public.reading_cards
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.readings
      WHERE readings.id = reading_cards.reading_id
      AND readings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own reading cards"
  ON public.reading_cards
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.readings
      WHERE readings.id = reading_cards.reading_id
      AND readings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own reading cards"
  ON public.reading_cards
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.readings
      WHERE readings.id = reading_cards.reading_id
      AND readings.user_id = auth.uid()
    )
  );

-- Create index on user_id for faster queries
CREATE INDEX readings_user_id_idx ON public.readings (user_id);
CREATE INDEX reading_cards_reading_id_idx ON public.reading_cards (reading_id);
