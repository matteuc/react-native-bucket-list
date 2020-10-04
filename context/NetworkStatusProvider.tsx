import React, { createContext, useContext, useState } from 'react';
import { NetworkProvider, NetworkConsumer } from 'react-native-offline';
import { Snackbar } from 'react-native-paper';

interface NetworkState {
  isConnected: boolean;
  callNetworkAction: (f: Function) => () => void;
}

interface NetworkStatusProviderProps {
  isConnected: boolean;
  children: React.ReactNode;
}

const NetworkContext = createContext<NetworkState>({
  isConnected: false,
  callNetworkAction: () => () => {},
});

const InternalNetworkStatusProvider: React.FC<NetworkStatusProviderProps> = ({
  isConnected,
  children,
}: NetworkStatusProviderProps) => {
  const [statusVisible, setStatusVisible] = useState(false);

  const onDismissSnackBar = () => setStatusVisible(false);

  const callNetworkAction = (fn: Function) => () => {
    if (isConnected) {
      fn();
    } else {
      setStatusVisible(true);
    }
  };

  return (
    <NetworkContext.Provider value={{ isConnected, callNetworkAction }}>
      <Snackbar visible={statusVisible} onDismiss={onDismissSnackBar}>
        You are currently offline. Please try again later!
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
