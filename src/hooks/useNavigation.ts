import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigation = {
    home: () => navigate('/'),
    about: () => navigate('/about'),
    services: () => navigate('/services'),
    documentation: () => navigate('/documentation'),
    faq: () => navigate('/faq'),
    privacy: () => navigate('/privacy'),
    contact: () => navigate('/#contact')
  };

  return navigation;
};