import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, useRouter } from "expo-router";

const index = () => {
	return <Redirect href={"/search"} />;
};

export default index;
