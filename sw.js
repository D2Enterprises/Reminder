self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'You have a new task reminder!',
        icon: 'icon-192x192.png',
        vibrate: [200, 100, 200],
        actions: [
            {action: 'view', title: 'View'},
            {action: 'dismiss', title: 'Dismiss'}
        ]
    };
    event.waitUntil(
        self.registration.showNotification('Task Reminder', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Optional: Redirect to a specific URL or focus the app
});
