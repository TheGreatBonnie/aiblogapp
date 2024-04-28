"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMakeCopilotReadable, CopilotKit } from "@copilotkit/react-core";
import {
  CopilotTextarea,
  HTMLCopilotTextAreaElement,
} from "@copilotkit/react-textarea";
import { addComment } from "@/utils/supabase/AddComment";
import { createClient } from "@/utils/supabase/client";

export default function Comment({ postId }: { postId: any }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [articleContent, setArticleContent] = useState("");

  useMakeCopilotReadable(
    "Blog article content: " + JSON.stringify(articleContent)
  );

  useEffect(() => {
    const fetchComments = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("comments").select("*");
      if (data) {
        setComments(data);
      }
    };

    const fetchArticleContent = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", postId)
        .single();

      if (data?.id == postId) {
        setArticleContent(data.content);
      }
    };

    fetchArticleContent();
    fetchComments();
  }, [postId]);

  console.log(comments);

  const copilotTextareaRef = useRef<HTMLCopilotTextAreaElement>(null);

  return (
    <CopilotKit url="/api/copilotkit">
      <div className="max-w-2xl mx-auto w-full p-3">
        <form
          action={addComment}
          className="border border-teal-500 rounded-md p-3 mb-4">
          <textarea
            id="content"
            name="content"
            placeholder="Add a comment..."
            rows={3}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="hidden"
          />

          <CopilotTextarea
            className="p-4 w-full rounded-lg mb-2 border text-sm border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
            ref={copilotTextareaRef}
            placeholder="Start typing for content autosuggestion."
            onChange={(event) => setComment(event.target.value)}
            rows={5}
            autosuggestionsConfig={{
              textareaPurpose: articleContent,
              chatApiConfigs: {
                suggestionsApiConfig: {
                  forwardedParams: {
                    max_tokens: 5,
                    stop: ["\n", ".", ","],
                  },
                },
                insertionApiConfig: {},
              },
              debounceTime: 250,
            }}
          />
          <input
            type="text"
            id="postId"
            name="postId"
            value={postId}
            className="hidden"
          />
          <div className="flex justify-between items-center mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
        <p className="text-white mb-2">Comments:</p>
        {comments?.map(
          (postComment) =>
            postComment.postId == postId && (
              <div
                key={postComment.id}
                className="flex p-4 border-b dark:border-gray-600 text-sm">
                <div className="flex-shrink-0 mr-3">
                  <Image
                    className="w-10 h-10 rounded-full bg-gray-200"
                    src={`https://source.unsplash.com/featured/?${encodeURIComponent(
                      "Silhouette"
                    )}`}
                    width={500}
                    height={500}
                    alt="Profile Picture"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-bold text-white mr-1 text-xs truncate">
                      Anonymous
                    </span>
                  </div>
                  <p className="text-gray-500 pb-2">{postComment.content}</p>
                </div>
              </div>
            )
        )}
      </div>
    </CopilotKit>
  );
}
