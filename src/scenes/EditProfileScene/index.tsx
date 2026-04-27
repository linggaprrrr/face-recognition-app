import React from "react";
import { Image, Pressable, SafeAreaView, ScrollView, View } from "react-native";

import Navbar from "@components/Navbar";
import Avatar from "@components/Avatar";
import Text from "@components/Text";
import images from "@images";
import TextInput from "@components/TextInput";
import Button from "@components/Button";
import icons from "@icons";

import { useEditProfileScene } from "./hooks/useEditProfileScene";
import styles from "./styles";

const EditProfileScene = () => {
  const { state, method } = useEditProfileScene();
  const { user, name, email, phone, address, selectedAvatar, loadingUpdate } = state;
  const { setName, setEmail, setPhone, setAddress, save, openGallery } = method;

  return (
    <>
      <SafeAreaView style={styles.container} />
      <Navbar title="Edit Profil" leftIcon={icons.arrowLeft} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <Pressable style={styles.avatarWrapper} onPress={openGallery}>
            <Avatar
              image={
                selectedAvatar
                  ? { uri: selectedAvatar }
                  : user.picture
                  ? { uri: user.picture }
                  : images.avatar
              }
            />
            <View style={styles.editAvatarBadge}>
              <Image source={icons.pencil} style={styles.pencil} />
            </View>
          </Pressable>
          <Text style={styles.avatarHint}>Tap foto untuk mengubah</Text>
        </View>

        {/* Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Informasi Pribadi</Text>

          <View style={styles.formCard}>
            <TextInput
              placeholder="Nama lengkap"
              label="Nama"
              containerStyle={styles.inputStyle}
              value={name}
              onChangeText={setName}
              maxLength={30}
            />
            <View style={styles.inputDivider} />
            <TextInput
              placeholder="Alamat email"
              label="Email"
              containerStyle={styles.inputStyle}
              value={email}
              onChangeText={setEmail}
              maxLength={50}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.inputDivider} />
            <TextInput
              placeholder="Nomor telepon"
              label="Telepon"
              containerStyle={styles.inputStyle}
              value={phone}
              onChangeText={setPhone}
              maxLength={20}
              keyboardType="phone-pad"
            />
            <View style={styles.inputDivider} />
            <TextInput
              placeholder="Alamat lengkap"
              label="Alamat"
              containerStyle={styles.inputStyle}
              value={address}
              onChangeText={setAddress}
              maxLength={100}
              multiline
            />
          </View>
        </View>

        {/* Save button */}
        <View style={styles.buttonWrapper}>
          <Button
            label="Simpan Perubahan"
            containerStyle={styles.button}
            onPress={save}
            loading={loadingUpdate}
          />
        </View>
      </ScrollView>

      <SafeAreaView />
    </>
  );
};

export default EditProfileScene;
