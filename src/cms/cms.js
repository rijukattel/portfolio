import Trend from "react-trend";
import { MdxControl, setupPreview } from "netlify-cms-widget-mdx";
import Trend from "react-trend";
import remarkEmojiPlugin from "remark-emoji";

CMS.registerWidget(
  "mdx",
  MdxControl,
  setupPreview({
    components: {
      h1: ({ children, ...props }) => (
        <h1 style={{ color: "tomato" }} {...props}>
          {children}
        </h1>
      ),
    },
    scope: {
      Layout: (props) => (
        <div
          style={{
            padding: "10px",
            border: "1px solid green",
            borderRadius: "5px",
          }}
          {...props}
        />
      ),
    },
    allowedImports: {
      "react-trend": {
        ImportDefault: Trend,
      },
    },
    mdPlugins: [remarkEmojiPlugin],
  })
);
