# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /Users/dimsdeall/Library/Android/sdk/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Google Play Services & Google Sign-In (umumnya untuk @react-native-google-signin/google-signin)
-keep class com.google.android.gms.auth.api.signin.** { *; }
-keep class com.google.android.gms.common.** { *; }
-keep interface com.google.android.gms.common.** { *; }
-dontwarn com.google.android.gms.**
-keep class co.apptailor.googlesignin.** { *; } # Jika menggunakan @react-native-google-signin/google-signin versi lama
-keep class com.reactnativegooglesignin.** { *; } # Jika menggunakan @react-native-google-signin/google-signin

# Keep any resource identifiers used by Google Play services
-keepclassmembers class **.R$* {
    public static <fields>;
}