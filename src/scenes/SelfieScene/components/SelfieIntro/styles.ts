import { StyleSheet } from "react-native";
import colors from "@colors";

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  safeTop: {
    backgroundColor: "#0A0A0A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: colors.white,
  },
  headerSpacer: {
    width: 36,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  faceIconContainer: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  faceIcon: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textDim,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
  },
  rulesList: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 14,
  },
  ruleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  ruleBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  ruleBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
  },
  examplesCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
  },
  exampleBlock: {
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 16,
  },
  exampleLabelGood: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.success,
    marginBottom: 12,
  },
  exampleLabelBad: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.error,
    marginBottom: 12,
  },
  exampleImgWrap: {
    position: "relative",
  },
  exampleImg: {
    width: 110,
    height: 135,
    borderRadius: 10,
  },
  badgeGood: {
    position: "absolute",
    bottom: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
  },
  badExamplesRow: {
    flexDirection: "row",
    gap: 12,
  },
  badImgWrap: {
    position: "relative",
  },
  badExampleImg: {
    width: 88,
    height: 108,
    borderRadius: 10,
  },
  badgeWrong: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
  safeBottom: {
    backgroundColor: "#0A0A0A",
  },
  startButton: {
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
  },
  startButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
