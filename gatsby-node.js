/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: "date", value: date.toISOString() });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // const homePage = path.resolve("src/templates/home/index.js");
  const postPage = path.resolve("src/templates/blog-post/index.js");
  const tagPage = path.resolve("src/templates/tag.jsx");
  const categoryPage = path.resolve("src/templates/category.jsx");
  const listingPage = path.resolve("./src/templates/blog-list/index.js");
  // const landingPage = path.resolve("./src/templates/landing.jsx");

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            tableOfContents
            frontmatter {
              title
              template
              tags
              category
              date
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Create markdown pages
  const posts = markdownQueryResult.data.allMarkdownRemark.edges;
  let blogPostsCount = 0;

  posts.forEach((post, index) => {
    const id = post.node.id;
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: path.resolve(
        `src/templates/${String(post.node.frontmatter.template)}/index.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    });

    // Count blog posts.
    if (post.node.frontmatter.template === "blog-post") {
      blogPostsCount++;
    }
  });

  // Paging
  const { postsPerPage } = siteConfig;
  // if (postsPerPage) {
  //   const pageCount = Math.ceil(blogPostsCount / postsPerPage);

  //   [...Array(pageCount)].forEach((_val, pageNum) => {
  //     createPage({
  //       path: pageNum === 0 ? `/` : `/${pageNum + 1}/`,
  //       component: homePage,
  //       context: {
  //         limit: 4,
  //         skip: pageNum * postsPerPage,
  //         pageCount,
  //         currentPageNum: pageNum + 1,
  //       },
  //     });
  //   });
  // } else {
  //   // Load the landing page instead
  //   createPage({
  //     path: `/`,
  //     component: landingPage,
  //   });
  // }

  // Page Listing(Blogs)
  const pageCount = Math.ceil(blogPostsCount / postsPerPage);

  [...Array(pageCount)].forEach((_val, pageNum) => {
    createPage({
      path: pageNum === 0 ? `/blogs` : `/blogs/${pageNum + 1}/`,
      component: listingPage,
      context: {
        limit: postsPerPage,
        skip: pageNum * postsPerPage,
        pageCount,
        currentPageNum: pageNum + 1,
      },
    });
  });

  // Post page creating
  postsEdges.forEach((edge, index) => {
    if (edge.node.frontmatter.template === "blog-post") {
      if (edge.node.frontmatter.tags) {
        // Generate a list of tags
        edge.node.frontmatter.tags.forEach((tag) => {
          tagSet.add(tag);
        });
      }

      // Generate a list of categories
      if (edge.node.frontmatter.category) {
        categorySet.add(edge.node.frontmatter.category);
      }

      // Create post pages
      const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
      const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
      const nextEdge = postsEdges[nextID];
      const prevEdge = postsEdges[prevID];

      createPage({
        path: edge.node.fields.slug,
        component: postPage,
        context: {
          slug: edge.node.fields.slug,
          nexttitle: nextEdge.node.frontmatter.title,
          nextslug: nextEdge.node.fields.slug,
          prevtitle: prevEdge.node.frontmatter.title,
          prevslug: prevEdge.node.fields.slug,
        },
      });
    }
  });

  //  Create tag pages
  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: { tag },
    });
  });

  // Create category pages
  categorySet.forEach((category) => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: { category },
    });
  });
};
