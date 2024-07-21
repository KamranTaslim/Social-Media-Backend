const followUser = async (currentUserId, userIdToFollow) => {
  try {
    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: userIdToFollow },
    });
    await User.findByIdAndUpdate(userIdToFollow, {
      $addToSet: { followers: currentUserId },
    });
    return { message: "User followed successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};
