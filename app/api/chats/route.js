import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://givjnsuxonlwccylhmla.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req, res) {
  let { data: chats, error } = await supabase
    .from("chats")
    .select("*")
    .limit(50);
  if (error) {
    return Response.json({ success: false });
  } else {
    return Response.json({ success: true, data: chats });
  }
}

export async function POST(req) {
  const data = await req.json();
  if (data.content === "") return Response.json({ success: true });
  const { data: supaData, error } = await supabase
    .from("chats")
    .insert([{ sender: data.sender, content: data.content }]);
  if (error) {
    return Response.json({ success: false });
  } else {
    console.log("data added");
    return Response.json({ success: true });
  }
}
