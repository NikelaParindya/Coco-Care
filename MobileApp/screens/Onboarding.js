import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");
import { Images, nowTheme } from "../constants/";
import { HeaderHeight } from "../constants/utils";

export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.Onboarding}
            style={{ flex: 1, height: height, width, zIndex: 1 }}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle>
                {/* <Image
                  source={Images.NowLogo}
                  style={{
                    width: 115,
                    height: 124,
                    bottom: 200,
                    position: "absolute",
                    marginBottom: 30,
                  }}
                /> */}
              </Block>
              <Block>
                <Block middle>
                  <Text
                    style={{
                      fontFamily: "montserrat-regular",
                      bottom: 80,
                      position: "absolute",
                      letterSpacing: 2,
                      paddingHorizontal: 20,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    color="white"
                    size={44}
                  >
                    CoCo Care
                  </Text>
                </Block>
              </Block>
              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2,
                }}
              >
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => navigation.navigate("App")}
                >
                  <Text
                    style={{ fontFamily: "montserrat-bold", fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    GROWTH PREDICTION
                  </Text>
                </Button>
              </Block>

              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2,
                }}
              >
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => navigation.navigate("Optimality")}
                >
                  <Text
                    style={{ fontFamily: "montserrat-bold", fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    OPTIMALITY CHECKING
                  </Text>
                </Button>
              </Block>
              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2,
                }}
              >
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => navigation.navigate("App")}
                >
                  <Text
                    style={{ fontFamily: "montserrat-bold", fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    SOIL CLASSIFICATION
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: "absolute",
    bottom:
      Platform.OS === "android" ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },

  gradient: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});
