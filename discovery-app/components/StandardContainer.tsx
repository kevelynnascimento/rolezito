import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children: ReactNode;
};

export default function StandardContainer({ children }: Props) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingTop: 8
  },
});
