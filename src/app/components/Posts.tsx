"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function Posts() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("articles").select("*");
      if (data) {
        setArticles(data);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="max-w-[85rem] h-full  px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((post) => (
          <Link
            key={post.id}
            className="group flex flex-col h-full bg-gray-800 border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 "
            href={`/${post.slug}`}>
            <div className="aspect-w-16 aspect-h-11">
              <Image
                className="object-cover h-48 w-96 rounded-xl"
                src={`https://source.unsplash.com/featured/?${encodeURIComponent(
                  post.title
                )}`}
                width={500}
                height={500}
                alt="Image Description"
              />
            </div>
            <div className="my-6">
              <h3 className="text-xl font-semibold text-white ">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
