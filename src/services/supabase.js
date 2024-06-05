import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://zhqffmairrncomoomtxw.supabase.co'
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocWZmbWFpcnJuY29tb29tdHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1NzAxODEsImV4cCI6MjAzMzE0NjE4MX0.SS1nC0T9yEzJ6k8zLzY1R5l2ID-twaJjtWg2JEpsjyM`
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
