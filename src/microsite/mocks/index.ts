export const ModalGalleryDataMockup = new Array(5).fill(null).map((val, index) => {
  return index + 1;
}).map((dVal, dIndex) => ({
  id: dVal,
  title: `Title ${dVal}`,
  description: `Description ${dVal}`,
  images: new Array(4).fill(null).map((iVal, iIndex) => {
    return `https://picsum.photos/1920/1080?random=${dVal * (iIndex + 1)}`
  })
}));
