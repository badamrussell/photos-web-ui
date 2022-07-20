import React from "react";
import styled from "styled-components";

const StyledGallery = styled.div`
  & > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const Gallery = React.forwardRef(({ children }, ref) => {

  React.useEffect(() => {

  } , []);
  return (
    <StyledGallery ref={ref}>
      {children}
    </StyledGallery>
  );
});
