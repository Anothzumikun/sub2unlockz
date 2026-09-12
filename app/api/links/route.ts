import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdminAuthed } from "@/lib/auth";

export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin()
    .from("links")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();

  const { data, error } = await supabaseAdmin()
    .from("links")
    .insert({
      slug: body.slug,
      title: body.title,
      platform_name: body.platform_name,
      platform_url: body.platform_url,
      target_link: body.target_link,
      youtube_like_url: body.youtube_like_url || null,
      delay_seconds: body.delay_seconds || 15,
      is_active: true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
