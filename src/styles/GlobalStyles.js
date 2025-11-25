  import { StyleSheet } from "react-native";

  export const sizes = {
    pagePadding: 20,
    inputHeight: 44,
    borderRadius: 12,
    sidebarWidth: 230,
    iconSize: 22,
    cardMaxWidth: 760,
  };

  export const GlobalStyles = StyleSheet.create({
    pageCenter: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: sizes.pagePadding,
    },
    card: {
      width: "100%",
      maxWidth: sizes.cardMaxWidth,
      padding: 22,
      borderRadius: sizes.borderRadius,
      alignItems: "center",
    },
    title: { fontSize: 26, fontWeight: "700", marginBottom: 10, textAlign: "center" },
    input: {
      width: "100%",
      height: sizes.inputHeight,
      borderRadius: sizes.borderRadius,
      paddingHorizontal: 12,
      marginBottom: 12,
      fontSize: 14,
    },
    button: {
      height: 46,
      borderRadius: sizes.borderRadius,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 14,
    },
    buttonText: { color: "#fff", fontWeight: "700" },
    sidebar: {
      width: sizes.sidebarWidth,
      height: "100%",
      paddingTop: 28,
      paddingHorizontal: 16,
    },
    sidebarItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
    },
  });
