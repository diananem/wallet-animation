import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  SafeAreaView,
  Dimensions
} from "react-native";
import { cards } from "./data/cards";

const cardHeight = 250;
const cardTitle = 45;
const cardPadding = 10;

const { height } = Dimensions.get("window");
export default class App extends React.Component {
  state = {
    y: new Animated.Value(0)
  };

  render() {
    const { y } = this.state;
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {cards.map((card, i) => {
              const inputRange = [-cardHeight, 0];
              const outputRange = [
                cardHeight * i,
                (cardHeight - cardTitle) * -i
              ];
              if (i > 0) {
                inputRange.push(cardPadding * i);
                outputRange.push((cardHeight - cardPadding) * -i);
              }
              const translateY = y.interpolate({
                inputRange,
                outputRange,
                extrapolateRight: "clamp"
              });
              return (
                <Animated.View
                  key={card.name}
                  style={{ transform: [{ translateY }] }}
                >
                  <View
                    style={[styles.card, { backgroundColor: card.color }]}
                  />
                </Animated.View>
              );
            })}
          </View>
          <Animated.ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 16
  },
  container: {
    flex: 1
  },
  content: {
    height: height * 2
  },
  card: {
    height: cardHeight,
    borderRadius: 10
  }
});
