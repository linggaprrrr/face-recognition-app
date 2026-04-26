import React from "react";
import { Image, Pressable, SafeAreaView, ScrollView, View } from "react-native";

import Navbar from "@components/Navbar";
import Avatar from "@components/Avatar";
import images from "@images";
import TextInput from "@components/TextInput";

import { useEditProfileScene } from "./hooks/useEditProfileScene";
import icons from "@icons";

import styles from "./styles";
import Button from "@components/Button";

const EditProfileScene = () => {
  const { state, method } = useEditProfileScene();
  const { user, name, email, phone, address, selectedAvatar, loadingUpdate } =
    state;
  const { setName, setEmail, setPhone, setAddress, save, openGallery } = method;

  return (
    <>
      <SafeAreaView style={styles.container} />
      <Navbar title="Edit Profile" leftIcon={icons.arrowLeft} />
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.avatarContainer} onPress={openGallery}>
          <View>
            <Avatar
              image={
                selectedAvatar
                  ? { uri: selectedAvatar } // 1. Avatar chosen/changed in this edit session
                  : user.picture
                  ? { uri: user.picture } // 2. Fallback to global user picture
                  : images.avatar // 3. Default placeholder if no other image is available
              }
            />
            <View style={styles.editAvatar}>
              <Image source={icons.pencil} style={styles.pencil} />
            </View>
          </View>
        </Pressable>
        <TextInput
          placeholder="name"
          label="Name"
          containerStyle={styles.inputStyle}
          value={name}
          onChangeText={setName}
          maxLength={30}
        />
        <TextInput
          placeholder="email"
          label="Email"
          containerStyle={styles.inputStyle}
          value={email}
          onChangeText={setEmail}
          maxLength={30}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="phone"
          label="Phone"
          containerStyle={styles.inputStyle}
          value={phone}
          onChangeText={setPhone}
          maxLength={30}
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="address"
          label="Address"
          containerStyle={styles.inputStyle}
          value={address}
          onChangeText={setAddress}
          maxLength={100} // Sesuaikan maxLength jika perlu
          multiline // Mungkin alamat bisa lebih dari satu baris
        />

        <Button
          label="SIMPAN"
          containerStyle={styles.button}
          onPress={save}
          loading={loadingUpdate}
        />
      </ScrollView>
      <SafeAreaView />
    </>
  );
};

export default EditProfileScene;
