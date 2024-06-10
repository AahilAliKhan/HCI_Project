import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import Skeleton from "@/components/shared/Skeleton.tsx";
import { useToast } from "@/components/ui/use-toast.ts";

function LeftSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { mutate: signOut } = useSignOutAccount();

  function singOutUser() {
    signOut();
    toast({ title: "Logout Successfully" });
    navigate("/sign-in");
  }

  return (
    <nav className="leftsidebar h-screen">
      <div className="flex flex-col gap-11 overflow-hidden">
        {/* logo */}
        <Link to="/">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        {/* Account profile */}
        {user.id ? (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <>
              <img
                src={`${user.imageUrl || "/assets/images/profile-placeholder.svg"}`}
                alt="profile"
                className="h-14 w-14 rounded-full"
              />
              <div className="flex flex-col">
                <p className="body-bold">{user.name}</p>
                <p className="small-regular">@{user.username}</p>
              </div>
            </>
          </Link>
        ) : (
          <div className="flex gap-3 items-center">
            <Skeleton className={"w-14 h-14"} circle={true} />
            <div className={"flex-1 space-y-1"}>
              <Skeleton className={"body-bold"} />
              <Skeleton className={"small-regular"} />
            </div>
          </div>
        )}
        {/* Links */}
        <ul className="flex flex-1 flex-col gap-5 overflow-y-scroll custom-scrollbar">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}
              >
                <NavLink
                  to={link.route}
                  className="flex items-center gap-4 p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && "invert-white"}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        onClick={singOutUser}
        className="shad-button_ghost mt-4"
      >
        <img src="/assets/icons/logout.svg" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
}

export default LeftSidebar;
