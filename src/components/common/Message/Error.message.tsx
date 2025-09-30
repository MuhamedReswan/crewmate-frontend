import { CircleX } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { MessageProps } from "@/types/type";
// import { MessageProps } from "@/types/message.type";


const ErrorMessage: React.FC<MessageProps> = ({
  message,
  className
}) => {
  return (
    <div className="flex justify-center text-red-700  items-center gap-4">
      <CircleX className={cn('w-10 h-10', className && `${className}`)} />
      <h1 className="">{message}</h1>
    </div>
  );
};

export default ErrorMessage;