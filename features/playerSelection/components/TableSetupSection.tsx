import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Animated, Text, View } from "react-native";
import { playerStyles } from "../styles";

type TableSetupSectionProps = {
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  timeOptions: number[];
  selectedMinutes: number | null;
  handleTimeChange: (value: number) => void;
  scoreLimit: number | null;
  setScoreLimit: (value: number) => void;
};

export function TableSetupSection({
  fadeAnim,
  scaleAnim,
  timeOptions,
  selectedMinutes,
  handleTimeChange,
  scoreLimit,
  setScoreLimit,
}: TableSetupSectionProps) {
  return (
    <Animated.View
      style={[
        playerStyles.billiardTable,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={playerStyles.tableHeader}>
        <Text style={playerStyles.tableTitle}>🎱 TABLE SETUP</Text>
        <Text style={playerStyles.tableSubtitle}>Configure your match</Text>
      </View>
      <View style={playerStyles.tableRail}>
        <View style={playerStyles.railSection}>
          <View style={playerStyles.ballIndicator}>
            <Text style={playerStyles.ballNumber}>⏰</Text>
          </View>
          <Text style={playerStyles.railLabel}>TIME LIMIT</Text>
          <View style={playerStyles.cueStick}>
            <Picker
              selectedValue={selectedMinutes ?? undefined}
              onValueChange={handleTimeChange}
              style={playerStyles.picker}
            >
              <Picker.Item label="Select time" value={undefined} />
              {timeOptions.map((minutes: number) => (
                <Picker.Item
                  key={minutes}
                  label={`${minutes} min`}
                  value={minutes}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <View style={playerStyles.tableRail}>
        <View style={playerStyles.railSection}>
          <View style={playerStyles.ballIndicator}>
            <Text style={playerStyles.ballNumber}>🎯</Text>
          </View>
          <Text style={playerStyles.railLabel}>SCORE LIMIT</Text>
          <View style={playerStyles.cueStick}>
            <Picker
              selectedValue={scoreLimit ?? undefined}
              onValueChange={setScoreLimit}
              style={playerStyles.picker}
            >
              <Picker.Item label="Select points" value={undefined} />
              <Picker.Item label="3 points" value={3} />
              <Picker.Item label="5 points" value={5} />
              <Picker.Item label="7 points" value={7} />
              <Picker.Item label="10 points" value={10} />
            </Picker>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
