# betashares


## Overview

This application is organized into two main parts:  
1. **Client**: Built using Vite and React.  
2. **Server**: Powered by Node.js and Express.

In the server, I am using WebSockets to establish a real-time connection with the client.

## Features

1. **WebSocket Integration**: Established a WebSocket connection to enable real-time communication between the server and client.
2. **Live Price Updates**: The watchlist is updated every second with the latest stock prices.
3. **Stock Transactions**: Users can buy or sell stocks by clicking on the respective **B** (Buy) or **S** (Sell) buttons.
4. **Order Management**: Once a transaction is completed, the corresponding order moves to the "Completed" state.
5. **Responsiveness**: Added responsive design elements to ensure a seamless transaction experience across various devices.
6. **File-based Tracking**: Instead of using a database, I am using file storage to track the status of transactions.

## How to Run

### Server

1. Navigate to the **server** folder.
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the server:  
   ```bash
   npm start
   ```

### Client

1. Navigate to the **client** folder.
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Run the client:  
   ```bash
   npm run dev
   ```





