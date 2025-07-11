import { CircleCheck } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { MessageProps } from '@/types/message.type'

const SuccessMessage: React.FC<MessageProps> = ({ className, message }) => {
  return (
    <div className="flex justify-center items-center gap-4 z-50 top-0 text-green-600">
      <CircleCheck className={cn('w-10 h-10 text-green-600', className && `${className}`)} />
      <h1>{message}</h1>
    </div>
  )
}

export default SuccessMessage
