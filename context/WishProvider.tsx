import React, { createContext, useContext, useState, useEffect } from 'react';
import { Wish, WishForm } from '../constants';
import {
  createWish,
  updateWish,
  watchWishes,
  deleteWish,
} from '../utils/wishes';
import { useAuth } from './AuthProvider';

interface WishContextProps {
  wishes: Array<Wish>;
  getWish: (id: string) => Wish | null;
  handleCreateWish: (w: WishForm) => any;
  handleDeleteWish: (id: string) => any;
  handleUpdateWish: (id: string, w: Partial<Wish>) => any;
  handleMarkWish: (id: string, c: boolean) => any;
}

const WishContext = createContext<WishContextProps>({
  wishes: [],
  getWish: () => null,
  handleCreateWish: () => {},
  handleDeleteWish: () => {},
  handleUpdateWish: () => {},
  handleMarkWish: () => {},
});

const WishProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [wishes, setWishes] = useState<Array<Wish>>([]);
  const [wishMap, setWishMap] = useState<Record<Wish['id'], Wish>>({});

  useEffect(() => {
    if (user?.id) {
      const unsubscribe = watchWishes(user.id, (updatedWishes) => {
        setWishes(updatedWishes);
        setWishMap(
          updatedWishes.reduce(
            (prevMap, wish) => ({ ...prevMap, [wish.id]: wish }),
            {}
          )
        );
      });

      return () => unsubscribe();
    }

    return () => {};
  }, [user?.id]);

  const getWish = (id: string) => wishMap[id];

  const handleCreateWish = async (wish: WishForm): Promise<Wish | null> => {
    if (!user?.id) return null;

    const createdWish = await createWish(wish, user?.id);

    return createdWish;
  };

  const handleMarkWish = async (
    id: string,
    completed: boolean
  ): Promise<void> => {
    if (!user?.id) return;

    await updateWish(id, user?.id, {
      completed,
      ...(completed ? { completedAt: Date.now() } : {}),
    });
  };

  const handleUpdateWish = async (
    id: string,
    wishUpdates: Partial<Wish>
  ): Promise<void> => {
    if (!user?.id) return;

    await updateWish(id, user?.id, wishUpdates);
  };

  const handleDeleteWish = async (id: string): Promise<void> => {
    if (!user?.id) return;

    await deleteWish(id, user?.id);
  };

  return (
    <WishContext.Provider
      value={{
        wishes,
        handleCreateWish,
        handleUpdateWish,
        handleMarkWish,
        handleDeleteWish,
        getWish,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};

const useWish = () => {
  const context = useContext(WishContext);
  if (context === undefined) {
    throw new Error(`useWish must be used within an WishProvider`);
  }

  return context;
};

export { WishProvider, useWish };
