'use client';

import { motion } from 'framer-motion';
import { Check, XCircle } from 'lucide-react';

interface AlertProps {
  message: string;
  onClose: () => void;
  type?: 'success' | 'error';
}

export function Alert({ message, onClose, type = 'success' }: AlertProps) {
  const isSuccess = type === 'success';

  return (
    <div className="fixed top-24 left-0 w-full flex justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`border-2 px-6 py-3 rounded-lg shadow-lg flex items-center min-w-[280px] ${
          isSuccess
            ? 'bg-gradient-to-r from-[#FFA500] to-[#FFD700] border-slate-900 text-slate-900'
            : 'bg-gradient-to-r from-red-500 to-red-700 border-white text-white'
        }`}
      >
        {isSuccess ? (
          <Check className="w-6 h-6" />
        ) : (
          <XCircle className="w-6 h-6" />
        )}
        <div className="flex-grow text-center ml-4">
          <span className="font-semibold">{message}</span>
        </div>
      </motion.div>
    </div>
  );
}
