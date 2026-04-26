import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useLazySearchFaceQuery } from '@redux/services/face-recognition';
import { setFeedPhotos } from '@redux/slice/home-slice';

export function usePhotosList() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const home = useSelector((state: RootState) => state.home);


  const nRadius = home.nRadius;

  const [debouncedRadius, setDebouncedRadius] = useState(nRadius);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [photos, setPhotos] = useState<Face.FaceSearchResult[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchFace, { data, isLoading, isFetching }] = useLazySearchFaceQuery();

  const fetchingData = ({ argPage }: { argPage: number }) => {
    if (argPage === 1) {
      setPhotos([]);
      setPage(1);
    }
    setIsRefreshing(false);
    searchFace({
      user_id: user.id,
      page: argPage,
      limit,
      top_k: 100,
      collection_name: 'face_embeddings',
      nRadius: debouncedRadius,
      unit_id: home.unit_id === '' ? undefined : home.unit_id,
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRadius(nRadius);
    }, 1500);
    return () => clearTimeout(handler);
  }, [nRadius]);

  useEffect(() => {
    fetchingData({ argPage: 1 });
  }, [home.unit_id, debouncedRadius]);

  useEffect(() => {
    if (data?.results) {
      if (isRefreshing || data.page === 1) {
        setPhotos(data.results);
        setIsRefreshing(false);
      } else {
        setPhotos(prev => [...prev, ...data.results]);
      }
    }
  }, [data]);

  useEffect(() => {
    dispatch(setFeedPhotos(photos));
  }, [photos]);

  const onRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    fetchingData({ argPage: 1 });
  };

  useEffect(() => {
    fetchingData({ argPage: page });
  }, [page]);

  const groupedPhotos: Face.IPhotos[] = useMemo(() => {
    const result: Face.IPhotos[] = [];
    for (let i = 0; i < photos.length; i += 2) {
      result.push({
        data: [photos[i], photos[i + 1]].filter(Boolean),
        type: (i / 2) % 4 + 1,
      });
    }
    return result;
  }, [photos]);

  return {
    state: {
      photos,
      data,
      groupedPhotos,
      isLoading: isLoading || isFetching || isRefreshing,
      isRefreshing,
      page,
    },
    method: {
      setPage,
      onRefresh,
    },
  };
}
