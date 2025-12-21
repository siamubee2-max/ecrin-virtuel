import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://amafgweelzayrjzemdtq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtYWZnd2VlbHpheXJqemVtZHRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMjI4MzgsImV4cCI6MjA4MTg5ODgzOH0.yg1jYRgrqDWMRCGHGEGR8C5jn7WmRTRC8U_1qtciDSk'

export const supabase = createClient(supabaseUrl, supabaseKey)