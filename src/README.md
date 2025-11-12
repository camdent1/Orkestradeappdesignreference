# Orkestrade

A comprehensive construction contractor management app designed for solo contractors, carpenters, and field service workers. Built with React, TypeScript, and Tailwind CSS.

## Features

### 🏠 Dashboard
- Active timer display with running project
- Weekly summary (hours, revenue, expenses, invoices)
- Recent activity feed showing all entity types
- Quick access to all core features

### 📂 Job Sites
- Manage active and completed construction projects
- Project details including client, location, and billing rate
- Quick timer start from job site cards
- Track hours, revenue, and expenses per project

### ⏱️ Time Tracking
- Active timer with real-time updates
- Manual time entry support
- Geofence integration (placeholder)
- Time entry cards with unbilled status

### 🧾 Receipts
- Expense capture and management
- OCR receipt scanning (placeholder for camera)
- Billable vs overhead categorization
- Filter by project assignment
- Detailed line item tracking

### 📄 Invoices
- Generate invoices from unbilled items
- Professional PDF generation (placeholder)
- Status tracking (draft, sent, paid, overdue)
- Email integration (placeholder)
- GST calculations

### 📅 Calendar
- Unified timeline across all entities
- Month view with event indicators
- Filter by entity type (time, receipts, invoices, personal)
- Selected day detail panel
- Color-coded entity types

### ⚙️ Settings
- Profile management
- Business settings (rates, geofencing, GST)
- Notification preferences
- Data sync status
- Connected accounts

## Design System

### Color Palette
- **Orkes Peach**: #FFAD87 (Primary accent, CTAs)
- **Orkes Peach Dark**: #FF8C52 (Hover states)
- **Orkes Navy**: #233138 (Primary text)
- **Orkes Cream**: #F8F4EE (Background)
- **Success Green**: #87FFAD (Paid, completed)
- **Info Blue**: #87C4FF (Personal events)
- **Warning Orange**: #FF8C52 (Unbilled)
- **Error Coral**: #F16455 (Overdue)

### Status System
Each entity has a status with corresponding colors:
- Unbilled (Orange)
- Invoiced/Sent (Blue)
- Paid (Green)
- Overdue (Coral)
- Active (Sky Blue)
- Draft (Gray)
- Personal (Blue)
- Billable (Green)

### Universal Card Component
All data entities display as interactive cards with:
- Color dot for entity type
- Title and subtitle
- Status badge
- Key insights (metrics)
- Quick actions (max 2)

## Key Components

### Navigation
- **Tab Navigation** (Bottom): 5 main tabs - Dashboard, Sites, Timer, Receipts, Invoices
- **Navigation Bar** (Top): Profile, page title, calendar, and add/camera icons
- **Settings**: Accessible via profile icon
- **Calendar**: Accessible via calendar icon

### Modals
- Create Job Site (with client creation)
- Manual Time Entry
- Receipt Review/Edit (placeholder)
- Invoice Generation (placeholder)

## Technical Stack

- **React** with TypeScript
- **Tailwind CSS** v4.0 (using CSS variables)
- **Lucide React** for icons
- **Shadcn/UI** components (Dialog, Button, Badge)

## Getting Started

This app is built with Figma Make and runs in the browser. All state is managed in React with local state (no backend integration in this demo).

### Demo Features
- Timer automatically increments when running
- Tab navigation between all main views
- Settings and Calendar accessible from navigation bar
- Modal dialogs for creating new entities
- Responsive design for mobile and desktop

### Mock Data
The app includes realistic mock data for:
- 3 active job sites
- Multiple time entries
- Receipt captures
- Generated invoices
- Personal events
- Bills and tasks

## Future Enhancements

- Real backend integration with Supabase
- Actual camera integration for receipt capture
- Real OCR with Apple Vision + Gemini AI
- Geofencing with notifications
- Email sending for invoices
- PDF generation
- Offline-first data sync
- Export to accounting software
- Multi-currency support
- Team collaboration features

## Philosophy

**Zero-touch automation** - The app is designed to minimize manual input and maximize intelligent capture through:
- Geofence-based auto timer start/stop
- OCR receipt scanning
- Auto-categorization of expenses
- Smart invoice generation from unbilled items
- Context-aware defaults

**Card-based UI** - Everything is a card for consistency and ease of interaction.

**Mobile-first** - Optimized for field use on iPhone, but works great on iPad and desktop too.
