interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  secondary, 
  fullWidth, 
  onClick, 
  large, 
  disabled, 
  outline 
}) => {
  return ( 
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        transition
        hover:opacity-80
        
        border-2
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-white' : 'bg-black'}
        ${secondary ? 'text-black' : 'text-slate-50'}
        ${secondary ? 'border-black' : 'black'}
        ${large ? 'text-xl' : 'text-md'}
        ${large ? 'px-5' : 'px-4'}
        ${large ? 'py-3' : 'py-2'}
        ${outline ? 'bg-transparent' : ''}
        ${outline ? 'border-black' : ''}
        ${outline ? 'text-black' : ''}
      `}
    >
      {label}
    </button>
   );
}
 
export default Button;
