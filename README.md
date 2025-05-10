# yalla-101
A small starter template having front end and backend


📱 Frontend
Task 1: Patient List with Search & Infinite Scroll

- Screen: searchable list.

- Features:

    - Debounced search (300 ms)

    - Infinite scroll (append pages)

    - Loading / empty / error states

    - “Book” button per item


Task 2: Offline-First Cache & Background Sync

Enhancement: wrap Q1 list with caching layer:

- Load last-cached results immediately from AsyncStorage.

- Fetch fresh in background → update UI + cache.

- Display “Last updated … ago.”