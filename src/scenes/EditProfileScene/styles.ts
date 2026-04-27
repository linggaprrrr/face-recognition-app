import colors from '@colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
  },
  scrollContent: {
    backgroundColor: colors.bg,
    paddingBottom: 40,
  },

  // ─── Avatar section ───────────────────────────────────────────
  avatarSection: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 24,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  pencil: {
    width: 12,
    height: 12,
    tintColor: colors.white,
  },
  avatarHint: {
    fontSize: 13,
    color: colors.textMid,
    fontWeight: '500',
  },

  // ─── Form section ─────────────────────────────────────────────
  formSection: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 4,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 4,
    gap: 0,
  },
  inputStyle: {
    marginBottom: 0,
  },
  inputDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 0,
  },

  // ─── Save button ──────────────────────────────────────────────
  buttonWrapper: {
    marginHorizontal: 16,
    marginTop: 28,
  },
  button: {
    borderRadius: 14,
    height: 52,
  },
});

export default styles;
