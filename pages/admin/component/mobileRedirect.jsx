import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MobileRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o agente do usuário contém palavras-chave comuns de dispositivos móveis
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      router.push('/unsuporteddevice'); // Redireciona para uma página específica para dispositivos móveis
    }
  }, []);

  return null;
};

export default MobileRedirect;
