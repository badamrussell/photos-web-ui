import styled from "styled-components";
import React from "react";

const StyledGalleryImage = styled.img`
  //aspect-ratio: auto 16 / 9;
`;

export function GalleryImage({src, alt}) {
  return (
    <StyledGalleryImage src={src} alt={alt} height="200"/>
  );
}