import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";

import Button from "../Button";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt])


  return ( 
    <div className="border-b-[1px] border-gray-200  pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="수정" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow} 
            label={isFollowing ? '안탔어요' : '탔어요'}
            secondary={!isFollowing}
            // outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-black text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">
            @{fetchedUser?.username}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-black">
            {fetchedUser?.bio}
          </p>
          <div 
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          ">
            <BiCalendar size={24} />
            <p>
              가입 날짜 {createdAt}
            </p>
          </div>
        </div>
        {/* <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-black">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-black">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div> */}
        {/* </div> */}
      </div>
    </div>
   );
}
 
export default UserBio;