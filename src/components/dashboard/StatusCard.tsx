import { motion } from 'framer-motion';

interface StatusCardProps {
    title: string;
    value?: string | number;
    icon: React.ReactNode;
    color: string;
    loading?: boolean;
}

export default function StatusCard({ title, value, icon, color, loading }: StatusCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-xl ${color} text-white`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm opacity-80">{title}</p>
                    <h3 className="text-2xl font-bold mt-1">
                        {loading ? '...' : value}
                    </h3>
                </div>
                <div className="text-white/80">
                    {icon}
                </div>
            </div>
        </motion.div>
    );
} 