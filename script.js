// Request notification permission
async function requestNotificationPermission() {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Notification permission denied.');
        }
    }
}

// Register service worker
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('sw.js');
            console.log('Service Worker registered with scope:', registration.scope);
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
}

// Add task functionality
document.getElementById('addTask').addEventListener('click', function() {
    const taskInput = document.getElementById('task');
    const timeInput = document.getElementById('time');
    const taskList = document.getElementById('taskList');
    
    if (taskInput.value && timeInput.value) {
        const li = document.createElement('li');
        li.textContent = `${taskInput.value} at ${timeInput.value}`;
        taskList.appendChild(li);
        
        // Schedule the notification
        scheduleNotification(taskInput.value, timeInput.value);
        
        taskInput.value = ''; // Clear the input
        timeInput.value = '';  // Clear the time input
    }
});

// Function to schedule notifications
function scheduleNotification(task, time) {
    const now = new Date();
    const [hours, minutes] = time.split(':');
    const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    // Calculate time until the notification should be triggered
    const timeUntilNotification = notificationTime - now;

    if (timeUntilNotification > 0) {
        setTimeout(() => {
            if (Notification.permission === 'granted') {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification('Task Reminder', {
                        body: `Reminder: ${task}`,
                        icon: 'icon-192x192.png',
                        vibrate: [200, 100, 200],
                        actions: [
                            {action: 'view', title: 'View'},
                            {action: 'dismiss', title: 'Dismiss'}
                        ]
                    });
                });
            } else {
                alert('Notification permission not granted. Please enable it in settings.');
            }
        }, timeUntilNotification);
    } else {
        alert("The time you set has already passed. Please set a future time.");
    }
}

// Theme toggle functionality
document.getElementById('toggleTheme').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
});

// Call the functions to request permission and register service worker
requestNotificationPermission();
registerServiceWorker();
