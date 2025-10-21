import { Sun, Moon, Globe } from 'lucide-react';
import { TangibleButton } from '@/components/ui/tangible-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export const LanguageThemeSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex gap-2">
      {/* Language Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TangibleButton variant="outline" size="icon">
            <Globe className="h-5 w-5" />
          </TangibleButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage('en')}>
            🇺🇸 English {language === 'en' && '✓'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('vi')}>
            🇻🇳 Tiếng Việt {language === 'vi' && '✓'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('ja')}>
            🇯🇵 日本語 {language === 'ja' && '✓'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Switcher */}
      <TangibleButton variant="outline" size="icon" onClick={toggleTheme}>
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </TangibleButton>
    </div>
  );
};
