import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';
import Icon from '../ui/Icon';
import Avatar from '../ui/Avatar';

export default function TopBar({ onMenuToggle }) {
  const user = useAuthStore((s) => s.user);

  const theme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);

  const [open, setOpen] = useState(false);

  const fullName = user ? `${user.nombre} ${user.apellido}` : '';

  const roleLabel =
    user?.role === 'admin'
      ? 'Administrador'
      : user?.role === 'usuario'
        ? 'Usuario'
        : '';

  return (
    <header className="flex justify-between items-center w-full px-lg h-16 sticky top-0 z-30 bg-surface shadow-sm font-montserrat">
      <div className="flex items-center md:gap-lg">
        <button
          onClick={onMenuToggle}
          className="p-sm text-on-surface-variant hover:text-primary transition-colors md:hidden flex items-center"
        >
          <Icon name="menu" />
        </button>

        <h1 className="text-headline-sm font-headline-sm text-primary">
          Dashboard
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-sm"
        >
          <div className="text-right hidden sm:block">
            <p className="text-label-lg text-primary font-bold leading-tight">
              {fullName}
            </p>
            <p className="text-[10px] text-on-surface-variant font-medium uppercase">
              {roleLabel}
            </p>
          </div>

          <Avatar name={fullName} size="md" />

        </button>


      </div>
    </header>
  );
}