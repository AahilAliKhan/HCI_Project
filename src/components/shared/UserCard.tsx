import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Models } from "appwrite";

type UserCardProps = {
	user: Models.Document;
};

function UserCard({ user }: UserCardProps) {
	return (
		<Link to={`/profile/${user.$id}`} className="user-card">
			<img
				src={user.imageUrl || "/assets/images/profile.png"}
				alt="top creator"
				className="w-14 h-14 rounded-full object-cover"
			/>

			<div className="space-y-1">
				<h3 className="base-medium text-light-1 text-center line-clamp-1">{user.name}</h3>
				<p className="small-regular text-light-3 text-center line-clamp-1">@{user.username}</p>
			</div>
			<Button type="button" size="sm" className="shad-button_primary px-5">
				Follow
			</Button>
		</Link>
	);
}
export default UserCard;
