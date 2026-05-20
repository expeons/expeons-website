import { defineConfig } from "tinacms";

// Your hosting provider login URL
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "local",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "insight",
        label: "Insights",
        path: "src/content/insights",
        format: "md",
        fields: [
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["Process Design", "Simulation", "Safety", "EPC Workflows", "Industry"],
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "readTime",
            label: "Read Time",
            required: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Title",
            description: "Optional: Overrides the main title for search engines.",
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description",
            description: "Optional: Overrides the excerpt for search engine snippets.",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "keywords",
            label: "SEO Keywords",
            description: "Optional: Comma-separated keywords for search engines.",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
