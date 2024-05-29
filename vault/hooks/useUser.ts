import { getMockUserRequest } from "@/constants/Api";
import { User } from "@/models/User.Model";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUser(username: string) {
	const request = getMockUserRequest(username);
	return axios.get(request).then(async (response) => response.data);
}

export default function useUser(username: string) {
	return useQuery<User>({
		queryKey: ["user"],
		queryFn: () => fetchUser(username),
	});
}
