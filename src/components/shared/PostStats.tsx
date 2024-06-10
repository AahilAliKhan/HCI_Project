import {
	useDeleteSavedPost,
	useGetCurrentUser,
	useLikePost,
	useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
	post?: Models.Document;
	userId: string;
};

function PostStats({ post, userId }: PostStatsProps) {
	const [likes, setLikes] = useState(() => post?.likes.map((user: Models.Document) => user.$id));
	const [isSaved, setIsSaved] = useState(false);
	const { mutate: likePost } = useLikePost();
	const { mutate: savePost, isPending: isSavingPost } = useSavePost();
	const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } = useDeleteSavedPost();

	const { data: currentUser } = useGetCurrentUser();

	const savedPostRecord = currentUser?.save?.find(
		(record: Models.Document) => record.post?.$id === post?.$id
	);

	function handleLikePost(e: React.MouseEvent) {
		e.stopPropagation();

		let newLikes = [...likes];

		const hasLiked = newLikes.includes(userId);
		if (hasLiked) {
			newLikes = newLikes.filter((id) => id !== userId);
		} else {
			newLikes.push(userId);
		}

		setLikes(newLikes);
		likePost({ postId: post?.$id || "", likesArray: newLikes });
	}

	function handleSavePost(e: React.MouseEvent) {
		e.stopPropagation();

		console.log(savedPostRecord, currentUser);

		if (savedPostRecord) {
			setIsSaved(false);
			deleteSavedPost(savedPostRecord.$id);
		} else {
			savePost({ postId: post?.$id || "", userId });
			setIsSaved(true);
		}
	}

	useEffect(() => {
		setIsSaved(!!savedPostRecord);
	}, [currentUser]);

	return (
		<div className="flex justify-between items-center z-20 gap-4">
			<div className="flex gap-2">
				<img
					src={checkIsLiked(likes, userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
					alt="like"
					width={20}
					height={20}
					onClick={handleLikePost}
					className="cursor-pointer w-5 h-5"
				/>

				<p className="small-medium lg:base-medium">{likes.length}</p>
			</div>
			<div className="flex gap-2">
				{isDeletingSavedPost || isSavingPost ? (
					<Loader />
				) : (
					<img
						src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
						alt="like"
						width={20}
						height={20}
						onClick={handleSavePost}
						className="cursor-pointer w-5 h-5"
					/>
				)}
			</div>
		</div>
	);
}
export default PostStats;
