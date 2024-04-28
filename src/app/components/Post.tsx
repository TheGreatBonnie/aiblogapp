"use client";

import { useRef, useState } from "react";
import { QuillEditor } from "./QuillEditor";
import { quillModules } from "./QuillEditor";
import { quillFormats } from "./QuillEditor";
import "react-quill/dist/quill.snow.css";
import {
  useMakeCopilotReadable,
  useCopilotAction,
} from "@copilotkit/react-core";
import {
  CopilotTextarea,
  HTMLCopilotTextAreaElement,
} from "@copilotkit/react-textarea";
import { addArticle } from "@/utils/supabase/AddArticle";

export default function CreatePost() {
  const [articleOutline, setArticleOutline] = useState("");
  const [copilotText, setCopilotText] = useState("");
  const [articleTitle, setArticleTitle] = useState("");

  useMakeCopilotReadable(
    "Blog article outline: " + JSON.stringify(articleOutline)
  );

  const copilotTextareaRef = useRef<HTMLCopilotTextAreaElement>(null);

  useCopilotAction(
    {
      name: "researchBlogArticleTopic",
      description: "Research a given topic for a blog article.",
      parameters: [
        {
          name: "articleTitle",
          type: "string",
          description: "Title for a blog article.",
          required: true,
        },
        {
          name: "articleOutline",
          type: "string",
          description:
            "Outline for a blog article that shows what the article covers.",
          required: true,
        },
      ],
      handler: async ({ articleOutline, articleTitle }) => {
        setArticleOutline(articleOutline);

        setArticleTitle(articleTitle);
      },
    },
    []
  );

  const [publishTaskRunning, setPublishTaskRunning] = useState(false);

  const handleEditorChange = (newContent: any) => {
    setCopilotText(newContent);
  };

  return (
    <>
      {/* Main */}
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-white text-3xl my-7 font-semibold">
          Create a post
        </h1>

        <form action={addArticle} className="flex flex-col gap-4 mb-2 mt-2">
          <div className="flex flex-col gap-4 sm:flex-row justify-between mb-2">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={articleTitle}
              onChange={(event) => setArticleTitle(event.target.value)}
              className="p-4 w-full rounded-lg border text-sm border-gray-600 bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <CopilotTextarea
            className="p-4 h-72 w-full rounded-lg mb-2 border text-sm border-gray-600 bg-gray-700 text-white placeholder-gray-400 resize-none"
            ref={copilotTextareaRef}
            placeholder="Start typing for content autosuggestion."
            value={articleOutline}
            rows={5}
            autosuggestionsConfig={{
              textareaPurpose: articleTitle,
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

          {/* Textarea for article content */}
          <textarea
            className="p-4 w-full aspect-square font-bold text-xl bg-slate-800 text-white rounded-lg resize-none hidden"
            id="content"
            name="content"
            value={copilotText}
            placeholder="Write your article content here"
            onChange={(event) => setCopilotText(event.target.value)}
          />

          <QuillEditor
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="h-80 mb-12 text-white"
          />
          <button
            type="submit"
            disabled={publishTaskRunning}
            className={`!bg-blue-500 text-white font-bold py-2 px-4 rounded ${
              publishTaskRunning
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
            onClick={async () => {
              // researchBlogArticleTopic.run(context);
              try {
                setPublishTaskRunning(true);
              } finally {
                setPublishTaskRunning(false);
              }
            }}>
            {publishTaskRunning ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </>
  );
}
