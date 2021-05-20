import { motion } from "framer-motion";
import styled from "styled-components";
import colors from "theme/colors.json";

export const CardStyle = styled(motion.div)`
  border-radius: 3px;
  background-color: ${({ theme }) => colors[theme].secondaryColor};
  margin: 2px;
  .detail-container {
    padding: 8px;
  }
  .title {
    margin: 0 10px;
  }
  .date {
    color: grey;
    margin: 10px;
    font-size: 16px;
  }
`;
