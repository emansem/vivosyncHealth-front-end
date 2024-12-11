export const SectionTitle = ({
  icon,
  title
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="flex items-center gap-2">
    <div className="text-primary_color">{icon}</div>
    <h2 className="text-lg font-semibold">{title}</h2>
  </div>
);

export const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <div className="text-primary_color">{icon}</div>
    <span>{text}</span>
  </div>
);

// Card wrapper - keeps our design consistent
export const Card = ({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);