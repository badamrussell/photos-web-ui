import React from "react";

import {useGalleryLayout} from "./useGalleryLayout";
import {useScrollPosition} from "./UseScrollPosition";

const SECTION_SCROLL_THRESHOLD = 30;

export function useCurrentPage() {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const [galleryLayout, { requestNextPage }] = useGalleryLayout();
  const [scrollPosition, ] = useScrollPosition();

  const currentPage = galleryLayout[currentPageIndex] ? galleryLayout[currentPageIndex].page : 0;

  React.useEffect(() => {
    if (galleryLayout.length === 0) return;
    let newPageIndex = 0;
    const firstSectionOffset = galleryLayout[0].position;
    const topPosition = window.scrollY + firstSectionOffset;
    while(galleryLayout[newPageIndex].position < topPosition) {
      if (newPageIndex >= galleryLayout.length) break;
      newPageIndex++;
    }
    newPageIndex--;
    newPageIndex = Math.max(0, newPageIndex);
    if (window.scrollY >= document.body.scrollHeight - window.innerHeight - SECTION_SCROLL_THRESHOLD) {
      newPageIndex = galleryLayout.length -1;
    }

    if (newPageIndex !== currentPageIndex) {
      setCurrentPageIndex(newPageIndex);
      requestNextPage(galleryLayout[newPageIndex].page);
    }
  }, [scrollPosition]);

  return [currentPage];
}