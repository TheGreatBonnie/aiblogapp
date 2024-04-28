import Header from "../components/Header";
import Comment from "../components/Comment";
import { createClient } from "@/utils/supabase/client";

async function getArticleContent(params: any) {
  // Extract the 'id' parameter from the provided 'params' object
  const { slug } = params;
  const supabase = createClient();

  // Retrieve article data from Supabase database where the 'id' matches the provided value
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  // Return the retrieved data
  return data;
}

export default async function Post({ params }: { params: any }) {
  const post = await getArticleContent(params);

  return (
    <>
      <Header />
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl text-white mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post && post.title}
        </h1>
        <div className="flex justify-between text-white p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span></span>
          <span className="italic">
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className="p-3 max-w-2xl text-white mx-auto w-full post-content border-b border-slate-500 mb-2"
          dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
        <Comment postId={post.id} />
      </main>
    </>
  );
}
