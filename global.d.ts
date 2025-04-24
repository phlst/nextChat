declare global {
  type User = {
    $id: string;
    name: string;
    email: string;
    avatar_url: string;
    friends: string[];
  };
  type Friend = {
    $id: string;
    name: string;
    avatar_url: string;
  };

  type FriendRequest = {
    $id: string;
    sender_id: string;
    receiver_id: string;
  };
  type RequestFriendData = {
    $id: string;
    name: string;
    avatar_url: string;
    requestId: string;
  };
  type Message = {
    senderId: string;
    message: string;
    timeSend: string;
  };
  type Chat = {
    friends: string[];
    messages: string[];
    $id: string;
  };
}

export {};
