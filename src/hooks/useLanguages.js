import { graphql, useStaticQuery } from 'gatsby';

const useLanguages = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allDatoCmsSite {
          edges {
            node {
              locale
            }
          }
        }
        datoCmsWebsiteSetting {
          blogPath
          projectPath
        }
      }
    `
  );

  const {
    allDatoCmsSite: {
      edges: [
        {
          node: { locale: defaultLanguage },
        },
      ],
    },

    datoCmsWebsiteSetting: { blogPath, projectPath },
  } = data;

  return {
    defaultLanguage,
    blogPath,
    projectPath,
  };
};

export default useLanguages;
