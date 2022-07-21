import React from "react";
import {useGalleryLayout} from "./hooks/useGalleryLayout";
import PlaceholderImage from "./PlaceholderImage";
import {GalleryImage} from "./GalleryImage";

export function GallerySection({sectionData}) {
  const sectionRef = React.useRef();
  const [, {setSinglePage}] = useGalleryLayout();

  React.useEffect(() => {
    const bounds = sectionRef.current.getBoundingClientRect();
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
                <PlaceholderImage key={i}/>
              );
            })
          ) : (
            sectionData.photos.map(photo => {
              return (
                <GalleryImage key={photo.id} src={photo.src.small} alt={photo.alt}/>
              );
            })
          )
      }
    </div>
  );
}