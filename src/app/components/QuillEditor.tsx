// Import the dynamic function from the "next/dynamic" package
import dynamic from "next/dynamic";
// Import the CSS styles for the Quill editor's "snow" theme
import "react-quill/dist/quill.snow.css";

// Export a dynamically imported QuillEditor component
export const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

// Define modules configuration for the Quill editor toolbar
export const quillModules = {
  toolbar: [
    // Specify headers with different levels
    [{ header: [1, 2, 3, false] }],
    // Specify formatting options like bold, italic, etc.
    ["bold", "italic", "underline", "strike", "blockquote"],
    // Specify list options: ordered and bullet
    [{ list: "ordered" }, { list: "bullet" }],
    // Specify options for links and images
    ["link", "image"],
    // Specify alignment options
    [{ align: [] }],
    // Specify color options
    [{ color: [] }],
    // Specify code block option
    ["code-block"],
    // Specify clean option for removing formatting
    ["clean"],
  ],
};

// Define supported formats for the Quill editor
export const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "align",
  "color",
  "code-block",
];
