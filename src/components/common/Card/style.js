import { motion } from "framer-motion";
import styled from "styled-components";
import colors from "theme/colors.json";

export const CardStyle = styled(motion.div)`
  border-radius: 3px;
  background-color: ${({ theme }) => colors[theme].secondaryColor};
  margin: 2px;
  min-height: 350px;

  .img-container {
    min-width: 100%;
    width: 100%;
    margin: auto;

    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    /* background-color: red; */
  }

  .detail-container {
    /* background-color: green; */
    width: 100%;
  }
  .title {
    text-align: center;
    margin: 0 10px;
  }
  .footer {
    color: grey;
    line-height: 1.7;
    padding: 0 10px;
    margin: 0 10px;
  }
  .date {
    color: grey;
    font-size: 16px;
    text-align: start;
  }
  .timeToRead {
    text-align: center;
  }
`;
