import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownViewer({ file }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}docs/${file}`)
      .then(res => res.text())
      .then(setContent);
  }, [file]);

  return <ReactMarkdown>{content}</ReactMarkdown>;
}
