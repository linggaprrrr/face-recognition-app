if(NOT TARGET react-native-vision-camera::VisionCamera)
add_library(react-native-vision-camera::VisionCamera SHARED IMPORTED)
set_target_properties(react-native-vision-camera::VisionCamera PROPERTIES
    IMPORTED_LOCATION "/Applications/MAMP/htdocs/react/ownize/node_modules/react-native-vision-camera/android/build/intermediates/cxx/Debug/676f1w6a/obj/x86_64/libVisionCamera.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Applications/MAMP/htdocs/react/ownize/node_modules/react-native-vision-camera/android/build/headers/visioncamera"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

