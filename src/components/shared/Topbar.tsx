import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

function Topbar() {
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const navigate = useNavigate();
	const { user } = useUserContext();

	useEffect(() => {
		if (isSuccess) navigate(0);
	}, [isSuccess]);

	return (
		<section className="topbar">
			<div className="flex-between py-4 px-5">
				{/* logo */}
				<Link to="/">
					<img src="/assets/images/logo.svg" alt="logo" width={130} height={325} />
				</Link>

				{/* right side area */}
				<div className="flex gap-4">
					<Button variant="ghost" onClick={() => signOut()} className="shad-button_ghost">
						<img src="/assets/icons/logout.svg" />
					</Button>

					{/* Account profile */}
					<Link to={`/profile/${user.id}`} className="flex-center">
						<img
							src={`${user.imageUrl || "/assets/icons/profile-placeholder.svg"}`}
							alt="profile"
							className="h-8 w-8 rounded-full"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
}
export default Topbar;
