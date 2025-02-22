import { cn } from '@/lib/utils'
import { MessageProps } from '@/types/message.type'
import { CircleCheck } from 'lucide-react'
import React from 'react'

const SuccessMessage: React.FC<MessageProps> = ({ className, message }) => {
  return (
    <div className="flex justify-center items-center gap-4 text-green-600">
      <CircleCheck className={cn('w-10 h-10 text-green-600', className && `${className}`)} />
      <h1>{message}</h1>
    </div>
  )
}

export default SuccessMessage
