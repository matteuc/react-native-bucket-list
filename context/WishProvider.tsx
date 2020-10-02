import React, { createContext, useContext, useState, useEffect } from 'react';
import { Wish, WishForm } from '../constants';
import { createWish, watchWishes } from '../utils/wishes';
import { useAuth } from './AuthProvider';

interface WishContextProps {
  wishes: Array<Wish>;
  handleCreateWish: (w: WishForm) => any;
}

const WishContext = createContext<WishContextProps>({
  wishes: [],
  handleCreateWish: () => {},
});

const WishProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [wishes, setWishes] = useState<Array<Wish>>([]);

  useEffect(() => {
    if (user?.id) {
      const unsubscribe = watchWishes(user.id, (updatedWishes) => {
        setWishes(updatedWishes);
      });

      return () => unsubscribe();
    }

    return () => {};
  }, [user?.id]);

  const handleCreateWish = async (wish: WishForm): Promise<Wish | null> => {
    if (!user?.id) return null;

    const createdWish = await createWish(wish, user?.id);

    return createdWish;
  };

  return (
    <WishContext.Provider value={{ wishes, handleCreateWish }}>
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
