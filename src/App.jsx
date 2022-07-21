import React from "react";
import styled from "styled-components";
import {ScrubHandle} from "./ScrubHandle";
import {Gallery} from "./Gallery";
import {useGalleryLayout} from "./hooks/useGalleryLayout";
import {GallerySection} from "./GallerySection";


const StyledApp = styled.div`
  height: 100vh;
`;

export default function App() {
  const [galleryPhotos] = useGalleryLayout();

  console.log(galleryPhotos)
  return (
    <StyledApp>
      <h2>Photos Web UI Project</h2>
      <ScrubHandle />

      <Gallery>
        {
          galleryPhotos.map(p => {
            return (
              <GallerySection key={p.page} sectionData={p} />
            );
          })
        }
      </Gallery>
    </StyledApp>
  );
}

