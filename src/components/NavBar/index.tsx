import { useTranslation } from 'react-i18next';
import './index.css';

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className='nav-bar'>
      <p className='nav-bar-title'>Trello</p>
      <div className='nav-bar-lang'>
        <p onClick={() => i18n.changeLanguage('en')}>English</p>
        <p onClick={() => i18n.changeLanguage('fr')}>Français</p>
      </div>
    </div>
  );
};
