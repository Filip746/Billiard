import { billiard } from '@/const/images';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { gameStyles } from './gameStyles';
import { useGameLogic } from './useGameLogic';
import React = require('react');

export function gameScreen() {
  const {
    player1,
    player2,
    scorePlayer1,
    scorePlayer2,
    minutes,
    seconds,
    increaseScore1,
    increaseScore2,
    handleFinishMatch,
    shouldShowFinish,
  } = useGameLogic();

  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground source={billiard} style={gameStyles.background}>
      <View style={gameStyles.landscapeRow}>
        <View style={gameStyles.sidePlayer}>
          <Image source={player1?.avatar} style={gameStyles.avatarLarge} />
          <Text style={gameStyles.playerName}>{player1?.name}</Text>
        </View>
        
        <View style={gameStyles.centerBlock}>
          <View style={gameStyles.scoreContainer}>
            <TouchableOpacity style={gameStyles.scoreBox} onPress={increaseScore1}>
              <Text style={gameStyles.scoreText}>{scorePlayer1}</Text>
            </TouchableOpacity>
            <Text style={gameStyles.vs}>:</Text>
            <TouchableOpacity style={gameStyles.scoreBox} onPress={increaseScore2}>
              <Text style={gameStyles.scoreText}>{scorePlayer2}</Text>
            </TouchableOpacity>
          </View>
          <Text style={gameStyles.timer}>
            {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
          </Text>
          {shouldShowFinish && (
            <TouchableOpacity
              style={gameStyles.finishButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={gameStyles.finishButtonText}>Finish Match</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={gameStyles.sidePlayer}>
          <Image source={player2?.avatar} style={gameStyles.avatarLarge} />
          <Text style={gameStyles.playerName}>{player2?.name}</Text>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={gameStyles.modalOverlay}>
          <View style={gameStyles.modalContent}>
            <Text style={gameStyles.modalHeader}>Match Summary</Text>

            <Text style={gameStyles.modalText}>
              {player1?.name} vs {player2?.name}
            </Text>
            <Text style={gameStyles.modalText}>
              {scorePlayer1} : {scorePlayer2}
            </Text>

            <TouchableOpacity
              style={gameStyles.confirmButton}
              onPress={() => {
                setModalVisible(false);
                handleFinishMatch(); 
              }}
            >
              <Text style={gameStyles.confirmButtonText}>Confirm & Finish</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={gameStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
