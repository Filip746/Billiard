import React from "react";
import { Animated, Image, ImageSourcePropType, Modal, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { gameStyles } from "../styles/gameStyles";

interface GameSummaryModalProps {
  isModalVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  player1?: { name: string; avatar: ImageSourcePropType };
  player2?: { name: string; avatar: ImageSourcePropType };
  score1: number;
  score2: number;
  animStyle?: StyleProp<ViewStyle>;
}

export default function GameSummaryModal({
  isModalVisible, onConfirm, onCancel,
  player1, player2, score1, score2,
  animStyle
}: GameSummaryModalProps) {
  return (
  <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={onCancel}
      >
        <View style={gameStyles.modalOverlay}>
          <Animated.View style={[gameStyles.modalContent, animStyle]}>
            <Text style={gameStyles.modalHeader}>🏆 Match Summary</Text>

            <View style={gameStyles.modalPlayersRow}>
              <Image source={player1?.avatar} style={gameStyles.modalAvatar} />
              <Text style={gameStyles.modalVs}>VS</Text>
              <Image source={player2?.avatar} style={gameStyles.modalAvatar} />
            </View>

            <Text style={gameStyles.modalText}>
              {player1?.name} vs {player2?.name}
            </Text>
            <Text style={gameStyles.modalScore}>
              {score1} : {score2}
            </Text>

            <TouchableOpacity
                style={gameStyles.confirmButton}
                onPress={onConfirm}
                activeOpacity={0.8}
            >
              <Text style={gameStyles.confirmButtonText}>✅ Confirm & Finish</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onCancel}>
              <Text style={gameStyles.cancelText}>❌ Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
      );
    }