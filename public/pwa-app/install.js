let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can install the PWA
    const installButton = document.getElementById('install-button');
    const installText = document.getElementById('install-text');
    installButton.style.display = 'block';
    installText.style.display = 'block';

    installButton.addEventListener('click', () => {
        // Hide the install button
        installButton.style.display = 'none';
        installText.style.display = 'none';
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
});
