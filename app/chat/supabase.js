import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://givjnsuxonlwccylhmla.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpdmpuc3V4b25sd2NjeWxobWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyODEzMDgsImV4cCI6MjAyMjg1NzMwOH0.qfd45KZdrZLGCuMpUrNBW-JZjM6w7WcVVmUA5NUZ4fk`;
export const supabase = createClient(supabaseUrl, supabaseKey);
