import React from "react";
import styled from "styled-components";
import {useGalleryLayout} from "./hooks/useGalleryLayout";
import {useCurrentPage} from "./hooks/useCurrentPage";
import {useScrollPosition} from "./hooks/UseScrollPosition";

const HANDLE_HEIGHT = 40;

const StyledScrubHandle = styled.div`
  height: ${HANDLE_HEIGHT}px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 40px;
  position: fixed;
  right: 0;
  margin-right: 10px;
  color: #FFF;
  display: flex;
  flex-grow: 1;
  align-content: center;
  justify-content: center;
  padding: 10px 20px;
  cursor: grab;
  user-select: none;
`;

export function ScrubHandle() {
  const [galleryLayout] = useGalleryLayout();
  const [scrollPosition] = useScrollPosition();
  const [currentPage] = useCurrentPage();

  const scrubPosition = calculateScrubPosition(scrollPosition) || 0;

  return (
    <StyledScrubHandle style={{top: scrubPosition}} onMouseDown={startScrubbing}>
      page {currentPage} of {galleryLayout.length}
    </StyledScrubHandle>
  );
}


function calculateScrubPosition() {
  const scrubBounds = [0, window.innerHeight - HANDLE_HEIGHT];
  const scrollBounds = [0, document.body.scrollHeight - window.innerHeight];
  const scrollPos = window.scrollY;
  return (scrollPos / scrollBounds[1]) * scrubBounds[1];
}

function calculateScrollPosition(scrubPosition) {
  const scrubBounds = [0, window.innerHeight - HANDLE_HEIGHT];
  const scrollBounds = [0, document.body.scrollHeight - window.innerHeight];

  return (scrubPosition / scrubBounds[1]) * scrollBounds[1];
}

function startScrubbing(e) {
  e.stopPropagation();
  let offset = null;

  function stopScrubbing() {
    window.removeEventListener('mousemove', scrubbing);
    window.removeEventListener('mouseup', stopScrubbing);
  }

  function scrubbing(e) {
    offset = offset === null ? e.offsetY : offset;
    const scrubPosition = e.target.getBoundingClientRect().top;
    const movement = e.clientY - scrubPosition;
    const result = scrubPosition + movement - offset;
    const scrollPos = calculateScrollPosition(result);
    window.scrollTo({top: scrollPos});
  }

  window.addEventListener('mousemove', scrubbing);
  window.addEventListener('mouseup', stopScrubbing);
}
