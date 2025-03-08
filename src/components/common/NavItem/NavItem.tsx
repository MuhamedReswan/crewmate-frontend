// Define the props for NavItem
interface NavItemProps {
  icon: React.ReactNode; // The icon to display
  text: string; // The text to display
  active?: boolean; // Whether the item is active
  onClick?: () => void; // Optional onClick handler
}

function NavItem({ icon, text, active = false, onClick }: NavItemProps) {
  return (
    <div
      className={`flex items-center px-4 py-3 ${active
          ? 'bg-[#4B49AC]/10 text-[#4B49AC] border-r-4 border-[#4B49AC]'
          : 'text-gray-600 hover:bg-gray-100'
        }`}
      onClick={onClick} // Attach the onClick handler
      style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
    >
      <div className="mr-3">{icon}</div>
      <span className="font-medium">{text}</span>
    </div>
  );
}

export default NavItem