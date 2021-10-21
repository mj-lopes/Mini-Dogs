import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNewPhotos } from "../../store/photos";
import { ButtonPhotos, PhotosContent, LoadBar } from "../../components";

export const PhotosList = () => {
  const { page, hasPhotos, loading } = useSelector((state) => state.photos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNewPhotos(1));
  }, [dispatch]);

  // Button actions
  function handleClick() {
    dispatch(loadNewPhotos(page + 1));
  }

  function showButton() {
    if (hasPhotos) return <ButtonPhotos onClick={handleClick}>+</ButtonPhotos>;
  }

  return (
    <>
      <PhotosContent />
      {loading ? <LoadBar /> : showButton()}
    </>
  );
};
