import React from "react";
import styled from "styled-components";
import PlaceholderImage from "./PlaceholderImage";
import {ScrubHandle} from "./ScrubHandle";
import {Gallery} from "./Gallery";
import {GalleryImage} from "./GalleryImage";
import {useGalleryLayout} from "./hooks/useGalleryLayout";


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

      <Gallery >
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

function GallerySection({ sectionData }) {
  const sectionRef = React.useRef();
  const [, { setSinglePage }] = useGalleryLayout();

  // TODO: the bounds need to be put in a different store.

  React.useEffect(() => {
    const bounds = sectionRef.current.getBoundingClientRect();
    // console.log(sectionData.page, bounds.top)
    setSinglePage(sectionData.page, {
      position: bounds.top,
    })
  }, []);

  return (
    <div ref={sectionRef}>
      {
        sectionData.photos.length === 0
          ? (
            (new Array(80)).fill(0).map((_p, i) => {
              return (
                <PlaceholderImage key={i} />
              );
            })
          ) : (
            sectionData.photos.map(photo => {
              return (
                <GalleryImage key={photo.id} src={photo.src.small} alt={photo.alt} />
              );
            })
          )
      }
    </div>
  );
}