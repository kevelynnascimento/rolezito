import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children: ReactNode;
  backgroundColor?: string;
};

export default function ScreenContainer({ 
  children, 
  backgroundColor = '#F3F4F6' 
}: Props) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
});
