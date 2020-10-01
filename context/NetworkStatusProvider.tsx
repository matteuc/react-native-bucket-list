import React, { createContext, useEffect, useContext, useState } from 'react';
import { NetworkProvider, NetworkConsumer } from 'react-native-offline';
import { Snackbar } from 'react-native-paper';

interface NetworkState {
  isConnected: boolean;
}

interface NetworkStatusProviderProps extends NetworkState {
  isConnected: boolean;
  children: React.ReactNode;
}

const NetworkContext = createContext<NetworkState>({
  isConnected: false,
});

const InternalNetworkStatusProvider: React.FC<NetworkStatusProviderProps> = ({
  isConnected,
  children,
}: NetworkStatusProviderProps) => {
  const [statusVisible, setStatusVisible] = useState(false);

  const onDismissSnackBar = () => setStatusVisible(false);

  useEffect(() => {
    setStatusVisible(true);
  }, [isConnected]);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      <Snackbar visible={statusVisible} onDismiss={onDismissSnackBar}>
        You are {!isConnected ? 'not' : ''} connected!
      </Snackbar>
      {children}
    </NetworkContext.Provider>
  );
};

const NetworkStatusProvider: React.FC = ({ children }) => {
  return (
    <NetworkProvider>
      <NetworkConsumer>
        {({ isConnected }) => (
          <InternalNetworkStatusProvider isConnected={isConnected}>
            {children}
          </InternalNetworkStatusProvider>
        )}
      </NetworkConsumer>
    </NetworkProvider>
  );
};

const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error(`useNetwork must be used within an NetworkStatusProvider`);
  }

  return context;
};

export { NetworkStatusProvider, useNetwork };
