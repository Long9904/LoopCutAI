import { Globe } from 'lucide-react';
import { TangibleButton } from '@/components/ui/tangible-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TangibleButton variant="outline" size="icon">
          <Globe className="h-5 w-5" />
        </TangibleButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border z-50">
        <DropdownMenuItem onClick={() => setLanguage('en')} className="hover:bg-accent">
          🇺🇸 English {language === 'en' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('vi')} className="hover:bg-accent">
          🇻🇳 Tiếng Việt {language === 'vi' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ja')} className="hover:bg-accent">
          🇯🇵 日本語 {language === 'ja' && '✓'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
