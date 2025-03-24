import React from 'react';
import { Text as DefaultText, View as DefaultView, StyleSheet, ViewProps, TextProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const theme = useTheme();

  return <DefaultText style={[{ color: theme.text }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const theme = useTheme();

  return <DefaultView style={[{ backgroundColor: theme.background }, style]} {...otherProps} />;
}
