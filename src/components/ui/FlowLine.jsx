import { motion } from 'framer-motion';

export default function FlowLine() {
  return (
    <div className="relative hidden h-px flex-1 overflow-hidden md:block">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-cyan-500/20" />
      <motion.div
        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent"
        initial={{ x: '-30%' }}
        animate={{ x: '130%' }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
