// Creating Database
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mcgxonulxclcyrtynujv.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jZ3hvbnVseGNsY3lydHludWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxNTI5MzUsImV4cCI6MjAyMDcyODkzNX0.CEKiqF914AaOxPPDs4FfPf3lzxRIiWep-orMvjKuyPo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
