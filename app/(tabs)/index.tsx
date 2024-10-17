import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { Avatar, Button, Checkbox, Title } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons, AntDesign, Entypo, Feather } from '@expo/vector-icons';

const localVideo = require('../../assets/images/goFast.mp4');
const localImage = require('../../assets/images/kaysen.png');

const publications = [

  // TikTok publications
    {
    id: 1,
    type: 'tiktok',
    profile: 'Pabli.Ascabar',
    subtitle: 'drogue',
    videoLocal: localVideo,
    profileImageUri: 'https://randomuser.me/api/portraits/lego/6.jpg',
    content: "Tuto GoFast",
    isBenevolent: false,
    isFakeProfile: false,
    correctProblems: {
      harassment: false,
      hateSpeech: true,
      misinformation: false,
      inappropriateContent: true,
    },
  },
  {
    id: 2,
    type: 'tiktok',
    profile: 'Juliette.xo',
    subtitle: 'Animation',
    videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    profileImageUri: 'https://randomuser.me/api/portraits/lego/9.jpg',
    content: "J'aime trop cette animation 🥰",
    isBenevolent: true, // Bonne publication
    isFakeProfile: false, // Vrai profil
    correctProblems: {
      harassment: false,
      hateSpeech: false,
      misinformation: false,
      inappropriateContent: false,
    },
  },
  // Facebook publication
  {
    id: 3,
    type: 'facebook',
    profile: 'Fan2inoxtag ',
    subtitle: 'MontChiliade, Los Santos',
    imageLocal: localImage,
    content: "A chacun sont everest mon ❤️ !",
    isBenevolent: true,
    isFakeProfile: false,
    correctProblems: {
      harassment: false,
      hateSpeech: false,
      misinformation: false,
      inappropriateContent: false,
    },
  },

  // Instagram publication
  {
    id: 4,
    type: 'instagram',
    profile: 'VraiActu132',
    subtitle: 'BO6',
    imageUri: 'https://jvmag.ch/wp-content/uploads/2024/08/call-of-duty-bo6.jpg',
    content: '16/10/2024 Activision annonce le retrait de la sortie de BO6 🔫😓',
    isBenevolent: false,
    isFakeProfile: true,
    correctProblems: {
      harassment: false,
      hateSpeech: false,
      misinformation: true,
      inappropriateContent: false,
    },
},

];

const PostScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Index de la publication actuelle
  const [isBenevolent, setIsBenevolent] = useState<boolean | null>(null);
  const [isFakeProfile, setIsFakeProfile] = useState(false);
  const [problems, setProblems] = useState({
    harassment: false,
    hateSpeech: false,
    misinformation: false,
    inappropriateContent: false,
  });
  const [feedback, setFeedback] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const currentPost = publications[currentIndex]; // Publication actuelle

  const handleCheck = (problem: keyof typeof problems) => {
    setProblems({ ...problems, [problem]: !problems[problem] });
  };

  const handleSubmit = () => {
    const { isBenevolent: correctBenevolence, isFakeProfile: correctFakeProfile, correctProblems } = currentPost;

    let success = true;

    // Vérification de la bienveillance
    if (isBenevolent !== correctBenevolence) {
      success = false;
    }

    // Vérification du faux profil
    if (isFakeProfile !== correctFakeProfile) {
      success = false;
    }

    // Vérification des problèmes
    Object.keys(problems).forEach((key) => {
      if (problems[key as keyof typeof problems] !== correctProblems[key as keyof typeof problems]) {
        success = false;
      }
    });

    // Afficher un feedback
    if (success) {
      setFeedback('Félicitations ! Vous avez correctement évalué la publication.');
    } else {
      setFeedback('Oops ! Certaines de vos réponses ne sont pas correctes.');
    }

    setModalVisible(false); // Fermer le modal après soumission

    // Passer à la prochaine publication après 3 secondes
    setTimeout(() => {
      setFeedback(''); // Effacer le feedback après quelques secondes
      if (currentIndex < publications.length - 1) {
        setCurrentIndex(currentIndex + 1); // Passer à la prochaine publication
        resetForm(); // Réinitialiser les réponses de l'utilisateur
      } else {
        Alert.alert('Fin du jeu', 'Vous avez évalué toutes les publications.');
        setCurrentIndex(0); // Revenir à la première publication
        resetForm(); // Réinitialiser les réponses
      }
    }, 2000);
  };

  const resetForm = () => {
    setIsBenevolent(null);
    setIsFakeProfile(false);
    setProblems({
      harassment: false,
      hateSpeech: false,
      misinformation: false,
      inappropriateContent: false,
    });
  };

  // Rendu pour les publications TikTok
const renderTikTokPost = () => (
  <View style={styles.container}>
    {/* Contenu vidéo */}
    <Video
      source={currentPost.videoLocal ? currentPost.videoLocal : { uri: currentPost.videoUri }}
      rate={1.0}
      volume={1.0}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={styles.video}
    />

    {/* Détails de la publication */}
    <View style={styles.postDetails}>
      {/* Informations du profil */}
      <View style={styles.profileContainer}>
        <Avatar.Image size={48} source={{ uri: currentPost.profileImageUri }} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.username}>{currentPost.profile}</Text>
          <Text style={styles.location}>{currentPost.subtitle}</Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Suivre</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.postText}>{currentPost.content}</Text>

      {/* Musique */}
      <View style={styles.musicContainer}>
        <Entypo name="beamed-note" size={16} color="#fff" />
        <Text style={styles.musicText}>Son original - {currentPost.profile}</Text>
      </View>
    </View>

      {/* Icônes d'action */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="hearto" size={32} color="#fff" />
          <Text style={styles.actionLabel}>123</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-ellipses-outline" size={32} color="#fff" />
          <Text style={styles.actionLabel}>456</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="arrow-redo-outline" size={32} color="#fff" />
          <Text style={styles.actionLabel}>Partager</Text>
        </TouchableOpacity>
      </View>

      {/* Bouton pour évaluer la publication */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.evaluateButton}>
        <MaterialCommunityIcons name="shield-search" size={32} color="#fff" />
        <Text style={styles.evaluateButtonText}>Évaluer</Text>
      </TouchableOpacity>

      {/* Affichage du feedback après soumission */}
      {feedback !== '' && (
        <View style={styles.feedbackBox}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      )}
    </View>
  );

  // Rendu pour les publications Facebook
const renderFacebookPost = () => (
  <ScrollView contentContainerStyle={styles.facebookContainer}>
    {/* Header */}
    <View style={styles.fbHeader}>
      <View style={styles.fbProfileInfo}>
        <Avatar.Image size={48} source={{ uri: 'https://randomuser.me/api/portraits/men/42.jpg' }} />
        <View style={styles.fbProfileTextContainer}>
          <Text style={styles.fbUsername}>{currentPost.profile}</Text>
          <Text style={styles.fbLocation}>{currentPost.subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Entypo name="dots-three-horizontal" size={24} color="#000" />
      </TouchableOpacity>
    </View>

    {/* Contenu */}
    <Text style={styles.fbContent}>{currentPost.content}</Text>
    <Image
      source={
        currentPost.imageLocal
          ? currentPost.imageLocal
          : { uri: currentPost.imageUri }
      }
      style={styles.fbImage}
    />

    {/* Boutons d'action */}
    <View style={styles.fbActionContainer}>
      <TouchableOpacity style={styles.fbActionButton}>
        <AntDesign name="like2" size={24} color="#000" />
        <Text style={styles.fbActionText}>J'aime</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fbActionButton}>
        <Ionicons name="chatbubble-outline" size={24} color="#000" />
        <Text style={styles.fbActionText}>Commenter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fbActionButton}>
        <Ionicons name="share-social-outline" size={24} color="#000" />
        <Text style={styles.fbActionText}>Partager</Text>
      </TouchableOpacity>
    </View>

    {/* Bouton pour évaluer la publication */}
    <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.fbEvaluateButton}>
      Évaluer la publication
    </Button>

    {/* Affichage du feedback après soumission */}
    {feedback !== '' && (
      <View style={styles.fbFeedbackBox}>
        <Text style={styles.fbFeedbackText}>{feedback}</Text>
      </View>
    )}
  </ScrollView>
);


  // Rendu pour les publications Instagram
  const renderInstagramPost = () => (
    <ScrollView contentContainerStyle={styles.instagramContainer}>
      {/* Header */}
      <View style={styles.igHeader}>
        <View style={styles.igProfileInfo}>
          <Avatar.Image size={36} source={{ uri: 'https://randomuser.me/api/portraits/women/58.jpg' }} />
          <Text style={styles.igUsername}>{currentPost.profile}</Text>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image source={{ uri: currentPost.imageUri }} style={styles.igImage} />

      {/* Boutons d'action */}
      <View style={styles.igActionContainer}>
        <View style={styles.igActionButtons}>
          <TouchableOpacity style={styles.igActionButton}>
            <AntDesign name="hearto" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.igActionButton}>
            <Feather name="message-circle" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.igActionButton}>
            <Feather name="send" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.igActionButton}>
          <Feather name="bookmark" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Contenu */}
      <View style={styles.igContentContainer}>
        <Text style={styles.igContent}>
          <Text style={styles.igContentUsername}>{currentPost.profile} </Text>
          {currentPost.content}
        </Text>
      </View>

      {/* Bouton pour évaluer la publication */}
      <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.igEvaluateButton}>
        Évaluer la publication
      </Button>

      {/* Affichage du feedback après soumission */}
      {feedback !== '' && (
        <View style={styles.igFeedbackBox}>
          <Text style={styles.igFeedbackText}>{feedback}</Text>
        </View>
      )}
    </ScrollView>
  );

  return (
    <>
      {currentPost.type === 'tiktok' && renderTikTokPost()}
      {currentPost.type === 'facebook' && renderFacebookPost()}
      {currentPost.type === 'instagram' && renderInstagramPost()}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Title>Ce contenu est-il bienveillant ?</Title>
              <Button
                mode={isBenevolent === true ? 'contained' : 'outlined'}
                onPress={() => setIsBenevolent(true)}
                style={styles.modalButton}
              >
                Oui
              </Button>
              <Button
                mode={isBenevolent === false ? 'contained' : 'outlined'}
                onPress={() => setIsBenevolent(false)}
                style={styles.modalButton}
              >
                Non
              </Button>

              <Title>Quels problèmes avez-vous identifiés ?</Title>
              <Checkbox.Item
                label="Harcèlement"
                status={problems.harassment ? 'checked' : 'unchecked'}
                onPress={() => handleCheck('harassment')}
              />
              <Checkbox.Item
                label="Discours de haine"
                status={problems.hateSpeech ? 'checked' : 'unchecked'}
                onPress={() => handleCheck('hateSpeech')}
              />
              <Checkbox.Item
                label="Désinformation"
                status={problems.misinformation ? 'checked' : 'unchecked'}
                onPress={() => handleCheck('misinformation')}
              />
              <Checkbox.Item
                label="Contenu inapproprié"
                status={problems.inappropriateContent ? 'checked' : 'unchecked'}
                onPress={() => handleCheck('inappropriateContent')}
              />

              <Title>Le profil semble-t-il être faux ?</Title>
              <Checkbox.Item
                label="Profil faux"
                status={isFakeProfile ? 'checked' : 'unchecked'}
                onPress={() => setIsFakeProfile(!isFakeProfile)}
              />

              <Button mode="contained" onPress={handleSubmit} style={styles.modalButton}>
                Soumettre votre évaluation
              </Button>
              <Button mode="text" onPress={() => setModalVisible(false)} style={styles.modalButton}>
                Fermer
              </Button>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({

 accountButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    alignItems: 'center',
  },
  accountButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  // Styles communs
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalContent: {
    padding: 20,
  },
  modalButton: {
    marginVertical: 10,
  },
  // Styles TikTok
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  postDetails: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
  },
  postText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    color: '#fff',
    fontSize: 12,
  },
  followButton: {
    marginLeft: 'auto',
    backgroundColor: '#ff0050',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicText: {
    color: '#fff',
    marginLeft: 5,
  },
  actionContainer: {
    position: 'absolute',
    right: 0,
    bottom: 120,
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  actionLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  evaluateButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  evaluateButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  feedbackBox: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    padding: 15,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
  },
  feedbackText: {
    fontSize: 16,
    color: '#00796b',
  },
  // Styles Facebook
  facebookContainer: {
    paddingTop: 50,
    paddingBottom: 150,
    backgroundColor: '#fff',
  },
  fbHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  fbProfileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fbProfileTextContainer: {
    marginLeft: 10,
  },
  fbUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  fbLocation: {
    fontSize: 12,
    color: '#555',
  },
  fbContent: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 10,
  },
  fbImage: {
    width: '100%',
    height: 300,
    marginBottom: 10,

  },
  fbActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  fbActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fbActionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#000',
  },
  fbEvaluateButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  fbFeedbackBox: {
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 10,
  },
  fbFeedbackText: {
    fontSize: 16,
    color: '#00796b',
  },
  // Styles Instagram
  instagramContainer: {
    paddingTop: 20,    
    paddingBottom: 130,
    backgroundColor: '#fff',
  },
  igHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  igProfileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  igUsername: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  igImage: {
    width: '100%',
    height: 400,
  },
  igActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  igActionButtons: {
    flexDirection: 'row',
  },
  igActionButton: {
    marginRight: 15,
  },
  igContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  igContent: {
    fontSize: 14,
    color: '#000',
  },
  igContentUsername: {
    fontWeight: 'bold',
    color: '#000',
  },
  igEvaluateButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  igFeedbackBox: {
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 10,
  },
  igFeedbackText: {
    fontSize: 16,
    color: '#00796b',
  },
});

export default PostScreen;
