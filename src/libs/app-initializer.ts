import { loadCartFromStorage } from '@redux/slice/cart-slice';
import { AppDispatch } from '@redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function AppInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadCartFromStorage());
  }, []);

  return null;
}