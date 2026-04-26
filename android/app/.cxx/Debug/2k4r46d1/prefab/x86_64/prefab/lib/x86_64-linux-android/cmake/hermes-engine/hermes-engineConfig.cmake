if(NOT TARGET hermes-engine::hermesvm)
add_library(hermes-engine::hermesvm SHARED IMPORTED)
set_target_properties(hermes-engine::hermesvm PROPERTIES
    IMPORTED_LOCATION "/Users/linggapangestu/.gradle/caches/8.13/transforms/8fabf4ac9ff5ee7611f8583e12b23ddc/transformed/hermes-android-0.14.0-debug/prefab/modules/hermesvm/libs/android.x86_64/libhermesvm.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/linggapangestu/.gradle/caches/8.13/transforms/8fabf4ac9ff5ee7611f8583e12b23ddc/transformed/hermes-android-0.14.0-debug/prefab/modules/hermesvm/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

