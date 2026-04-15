import { ReceiverProps } from "@/app/group/page";

export type GroupProps = {
  id: string;
  name: string;
  receiver: {
    receiverId: string;
    receiver: ReceiverProps;
  }[];
};
