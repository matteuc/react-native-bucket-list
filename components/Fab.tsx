import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from '../context/ThemeProvider';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

type FabProps = {
  icon: string;
  onPress: () => any;
  style?: StyleProp<ViewStyle>;
  size?: number;
};

const Fab: React.FC<FabProps> = ({
  icon,
  onPress,
  style = {},
  size = 80,
}: FabProps) => {
  const {
    colors: { accent },
  } = useTheme();

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('white', true)}
    >
      <View
        style={StyleSheet.flatten([
          styles.fab,
          style,
          {
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: accent,
          },
        ])}
      >
        <Icon name={icon} />
      </View>
    </TouchableNativeFeedback>
  );
};

export default Fab;
