import { useCallback } from "react";
import { TbPencilMinus } from "react-icons/tb";
import { useRouter } from "next/router";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarBoardButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push("/");
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick}>
      <div
        className="
        mt-6
        lg:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-black
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      "
      >
        <TbPencilMinus size={24} color="white" />
      </div>
      <div
        className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-black
        hover:bg-opacity-90 
        cursor-pointer
      "
      >
        <p
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white 
            text-[20px]
        "
        >
          TECPOOL
        </p>
      </div>
    </div>
  );
};

export default SidebarBoardButton;
