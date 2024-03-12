import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Vibration,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Galio components
import { Block, Text, theme, Button, Checkbox, Radio } from "galio-framework";
import { RadioButton, RadioButtonGroup } from "react-native-paper";

// Now UI themed components
import { nowTheme } from "../constants";
import { Icon, Input, Switch } from "../components";
import axios from "axios";
import * as Location from "expo-location";
import busfairs from "../constants/busfairs";
import Confirm from "./Confirm";
import { BACKEND_DOMAIN } from "../constants/config";
import { RadioGroup } from "react-native-radio-buttons-group";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

function TravelForm({ route, navigation }) {
  const radioButtons = useMemo(
    () => [
      {
        id: "0", // acts as primary key, should be unique and non-empty string
        label: "Low",
        value: "0",
      },
      {
        id: "1",
        label: "Medium",
        value: "1",
      },
      {
        id: "2",
        label: "High",
        value: "2",
      },
    ],
    []
  );

  const [bug, setBug] = useState(0);
  const [N, setN] = useState(0);
  const [P, setP] = useState(0);
  const [K, setK] = useState(0);
  const [PH, setPH] = useState(0);

  const [selectedId, setSelectedId] = useState(0);
  const [primaryFocus, setPrimaryFocus] = useState(true);

  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");

  const [modelshow, setModelshow] = useState(false);
  const [location, setLocation] = useState("");

  const setBugCount = (ckd) => {
    if (ckd) {
      setBug(bug + 1);
    } else {
      setBug(bug - 1);
    }
  };

  const calcNPK = (e, ftype) => {
    if (ftype == "urea") {
      setN(N + e * 0.468);
      setPH((PH + 6.75) / 2);
    } else if (ftype == "as") {
      setN(N + e * 0.21);
      setPH((PH + 6) / 2);
    } else if (ftype == "can") {
      setN(N + e * 0.27);
      setPH((PH + 6.25) / 2);
    } else if (ftype == "tsp") {
      setP(P + e * 0.46);
      setPH((PH + 2) / 2);
    } else if (ftype == "pc") {
      setK(K + e * 0.6);
      setPH((PH + 6.5) / 2);
    } else if (ftype == "dap") {
      setN(N + e * 0.18);
      setP(P + e * 0.46);
      setPH((PH + 6) / 2);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=a1c885abdacb4bbb92702244230309&q=${location.coords.latitude},${location.coords.longitude}aqi=no`
        )
        .then(async (res) => {
          setTemperature(res.data.current.temp_c);
          setRainfall(res.data.current.precip_mm);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  return (
    <Block flex center>
      <Confirm show={modelshow} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, width }}
      >
        <Block flex style={styles.group}>
          <Text size={16} style={styles.title}>
            Fertilizer Input
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              type="number-pad"
              placeholder="Urea (KG)"
              onChangeText={(e) => calcNPK(e, "urea")}
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
              shadowless
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              onChangeText={(e) => calcNPK(e, "as")}
              type="number-pad"
              placeholder="Ammonium Sulphate (KG)"
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
              shadowless
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              onChangeText={(e) => calcNPK(e, "can")}
              type="number-pad"
              placeholder="Calcium Ammonium Nitrate (KG)"
              shadowless
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              onChangeText={(e) => calcNPK(e, "tsp")}
              type="number-pad"
              placeholder="Triple Superphosphate (KG)"
              shadowless
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              onChangeText={(e) => calcNPK(e, "pc")}
              type="number-pad"
              placeholder="Potassium Chloride (KG)"
              shadowless
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={primaryFocus}
              right
              onChangeText={(e) => calcNPK(e, "dap")}
              type="number-pad"
              placeholder="Diammonium Phosphate (KG)"
              shadowless
              iconContent={
                <Icon
                  size={11}
                  color={nowTheme.COLORS.ICON}
                  name="single"
                  family="NowExtra"
                />
              }
            />
          </Block>

          <View
            style={{
              paddingHorizontal: 28,
              paddingTop: theme.SIZES.BASE,
              justifyContent: "center",
            }}
          >
            <Text>N : {((N/(N+P+K))*100).toFixed(0)}</Text>
            <Text>P : {((P/(N+P+K))*100).toFixed(0)}</Text>
            <Text>K : {((K/(N+P+K))*100).toFixed(0)}</Text>
            <Text>pH : {PH}</Text>
          </View>

          <View
            style={{
              paddingHorizontal: 28,
              paddingTop: theme.SIZES.BASE,
              justifyContent: "center",
            }}
          >
            <Text>Latitude : {location?.coords?.latitude}</Text>
            <Text>Longitude : {location?.coords?.longitude}</Text>
          </View>

          <View>
            <Text size={16} style={[styles.title, { marginTop: 50 }]}>
              Temperature
            </Text>

            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                primary={primaryFocus}
                right
                editable={false}
                type="number-pad"
                value={`${JSON.stringify(temperature)}`}
                placeholder="Temperature"
                shadowless
                iconContent={
                  <Icon
                    size={11}
                    color={nowTheme.COLORS.ICON}
                    name="single"
                    family="NowExtra"
                  />
                }
              />
            </Block>
          </View>

          <View>
            <Text size={16} style={[styles.title, { marginTop: 50 }]}>
              Rainfall
            </Text>

            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                primary={primaryFocus}
                right
                editable={false}
                value={`${JSON.stringify(rainfall)}`}
                type="number-pad"
                placeholder="Rainfall"
                shadowless
                iconContent={
                  <Icon
                    size={11}
                    color={nowTheme.COLORS.ICON}
                    name="single"
                    family="NowExtra"
                  />
                }
              />
            </Block>
          </View>

          <View>
            <Text size={16} style={[styles.title, { marginTop: 50 }]}>
              Bug
            </Text>

            <Checkbox
              style={{ margin: 10, marginLeft: 40 }}
              color="success"
              onChange={(e) => setBugCount(e)}
              initialValue={false}
              label="Mites"
            />
            <Checkbox
              style={{ margin: 10, marginLeft: 40 }}
              color="success"
              onChange={(e) => setBugCount(e)}
              initialValue={false}
              label="Red Palm Weevil"
            />
            <Checkbox
              style={{ margin: 10, marginLeft: 40 }}
              color="success"
              onChange={(e) => setBugCount(e)}
              initialValue={false}
              label="Black Headed Caterpillar"
            />
            <Checkbox
              style={{ margin: 10, marginLeft: 40 }}
              color="success"
              onChange={(e) => setBugCount(e)}
              initialValue={false}
              label="Coconut Rhinoceros Beetle"
            />
            <Checkbox
              style={{ margin: 10, marginLeft: 40 }}
              color="success"
              onChange={(e) => setBugCount(e)}
              initialValue={false}
              label="Mealybug"
            />
          </View>

          <View>
            <Text size={16} style={[styles.title, { marginTop: 50 }]}>
              Productivity
            </Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
            />
          </View>

          <View
            style={{ alignItems: "center", marginTop: theme.SIZES.BASE * 5 }}
          >
            <Button
              color={nowTheme.COLORS.PRIMARY}
              onPress={() => {
                navigation.navigate("Login", {
                  N: N,
                  P: P,
                  K: K,
                  PH: PH,
                  temperature: temperature,
                  rainfall:rainfall,
                  bug: bug,
                  productivity:selectedId
                });
              }}
            >
              Predict
            </Button>
          </View>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-bold",
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 20,
    color: nowTheme.COLORS.HEADER,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  button: {
    width: theme.SIZES.BASE * 3,
    margin: 4,
  },
  textst: {
    fontWeight: "bold",
    marginTop: theme.SIZES.BASE * 2,
  },
});

export default TravelForm;
