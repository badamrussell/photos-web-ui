import React from "react";
import {getCuratedPhotos, getCuratePhotosForPage} from "../api/PexelsAPI";
import curatedSummary from "../api/data/CuratedSummary.json";


const GalleryLayoutContext = React.createContext();

function reducer(prevState, action) {
  switch (action.type) {
    case 'overwrite':
      return action.data;
    case 'section-size':
      return prevState.map(g => {
        if (g.page === action.page) {
          return {
            ...g,
            ...action.data,
          };
        } else {
          return g;
        }
      })
    default:
      return prevState;
  }
}

export function GalleryLayoutProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, []);

  React.useEffect(() => {
    getCuratedPhotos().then(res => {
      const newData = curatedSummary.data.map(data => ({
        page: data.page,
        photoCount: data.photoCount,
        photos: [],
        position: 10,
      }));
      newData[0].photos = res.photos;

      dispatch({ type: 'overwrite', data: newData });
    });
  }, []);


  function setSinglePage(page, data) {
    dispatch({ type: 'section-size', data, page })
  }

  function requestNextPage(page) {
    console.log('REQUEST PAGE', page);
    getCuratePhotosForPage(page).then(result => {
      setSinglePage(page, result);
    });
  }

  return (
    <GalleryLayoutContext.Provider value={[state, { setSinglePage, requestNextPage }]} {...props} />
  );
}


export function useGalleryLayout() {
  return React.useContext(GalleryLayoutContext);
}


