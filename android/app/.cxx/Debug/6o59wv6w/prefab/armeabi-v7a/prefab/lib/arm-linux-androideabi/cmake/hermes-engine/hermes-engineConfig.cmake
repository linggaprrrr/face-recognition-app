if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/linggapangestu/.gradle/caches/8.11.1/transforms/fbe685b2a154ad00530defdb4c873a58/transformed/hermes-android-0.77.3-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/linggapangestu/.gradle/caches/8.11.1/transforms/fbe685b2a154ad00530defdb4c873a58/transformed/hermes-android-0.77.3-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

