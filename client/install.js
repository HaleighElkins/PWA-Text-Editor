const butInstall = document.getElementById('buttonInstall');

const handleBeforeInstallPrompt = (event) => {
  window.deferredPrompt = event;
  butInstall.classList.remove('hidden');
};

const handleInstallButtonClick = async () => {
  const promptEvent = window.deferredPrompt;
  if (promptEvent) {
    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.add('hidden');
  }
};

const handleAppInstalled = () => {
  window.deferredPrompt = null;
};

window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
butInstall.addEventListener('click', handleInstallButtonClick);
window.addEventListener('appinstalled', handleAppInstalled);
