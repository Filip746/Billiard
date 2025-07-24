import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
admin.initializeApp();

export const updateAllPlayerPoints = functions.https.onRequest(async (req, res) => {
  const playersSnapshot = await admin.firestore().collection("players").get();

  for (const playerDoc of playersSnapshot.docs) {
    const playerId = playerDoc.id;

    const matchesSnap = await admin.firestore()
        .collection("matches")
        .where(
            admin.firestore.Filter.or(
                admin.firestore.Filter.where("player1Id", "==", playerId),
                admin.firestore.Filter.where("player2Id", "==", playerId),
            )
        )
        .get();
    const allMatches = matchesSnap.docs;
    let wins = 0;

    allMatches.forEach((match) => {
      const m = match.data();
      if (
        (m.player1Id === playerId && m.scorePlayer1 > m.scorePlayer2) ||
        (m.player2Id === playerId && m.scorePlayer2 > m.scorePlayer1)
      ) {
        wins++;
      }
    });

    const points = allMatches.length > 0 ? wins / allMatches.length : 0;

    await admin.firestore()
      .collection("players")
      .doc(playerId)
      .update({ points });
  }

  res.send("All player points updated!");
});
