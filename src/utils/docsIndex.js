const modules = import.meta.glob("/public/docs/*.md", {
  eager: true,
  as: "raw"
});

export const docs = Object.entries(modules).map(([path, content]) => {
  const slug = path.split("/").pop().replace(".md", "");
  const title =
    content.match(/^#\s+(.*)/)?.[1] ??
    slug.replace(/-/g, " ");

  return {
    slug,
    title,
    content
  };
});
