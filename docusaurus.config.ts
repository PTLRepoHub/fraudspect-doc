import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Fraudspect",
  tagline: "Fraudspect Api Documentation",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://doc.getfraudspect.com/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "PTLRepoHub", // Usually your GitHub org/user name.
  projectName: "fraudspect-doc", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/", // Set this to "/" so that the docs are served from the root of the domain.
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/PTLRepoHub/fraudspect-doc/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: true,
      },
    },
    image: "https://assets.getfraudspect.com/assets/fraudspect.png",
    navbar: {
      logo: {
        alt: "Fraudspect",
        src: "img/fraudspect-logo.png",
      },
      title: "Fraudspect Docs",
      hideOnScroll: false,
      items: [
        {
          type: "html",
          position: "right",
          value: `<a target="_blank" href="https://app.getpostman.com/run-collection/38586059-2010dcdb-b0e1-4e95-8d22-27c33a2fc16c?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D38586059-2010dcdb-b0e1-4e95-8d22-27c33a2fc16c%26entityType%3Dcollection%26workspaceId%3Df97f23f4-71ff-4d6b-b944-e40a565bd444"><img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;"></a>`,
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
