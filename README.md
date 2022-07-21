# photos-web-ui

following along this article
https://medium.com/google-design/google-photos-45b714dfbed1


remaining
- Add typescript
- add gutters between photos
- placeholder images while loading?
- add more photos
  - sections could just be page requests. THere are no
  -
- 
- each row of photos must fit width of window
  - I don't think I can get this with flexbox.
  - try grid
  - otherwise have to calculate it
- Do I need object pooling for smoother scrolling?
  - is there a fps tool in chrome dev tools?
- window resize, only redo calcs when resize is done
- look for 
  - css `contain: layout;`
  - css `image-rendering: pixelated;`
  - css `filter: blur(3px);`
- if you scroll fast and get to sections that have not loaded yet, show placeholder
- while scrolling, replace different resolution images, depending on where they are from the current view 
- clicking a photo shows/animates into lightbox view, it might show more information also
- review image aspect ratio https://jakearchibald.com/2022/img-aspect-ratio/
- 

complete
- show current page in top-right of screen
  - grabbing that will allow you to scroll through the variouse pages
  - pexels curated api looks to have 8000 results. 80 per page. so 100 pages.
