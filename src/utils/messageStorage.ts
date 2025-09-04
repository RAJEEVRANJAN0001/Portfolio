// Message Storage Utility
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status?: 'unread' | 'read' | 'replied';
}

export class MessageStorage {
  private static STORAGE_KEY = 'portfolio_messages';

  static saveMessage(messageData: Omit<ContactMessage, 'id' | 'timestamp'>): ContactMessage {
    const message: ContactMessage = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'unread',
    };

    const existingMessages = this.getAllMessages();
    existingMessages.push(message);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingMessages));
    
    // Also save to a backup location (for persistence)
    this.saveToBackup(message);
    
    return message;
  }

  static getAllMessages(): ContactMessage[] {
    try {
      const messages = localStorage.getItem(this.STORAGE_KEY);
      return messages ? JSON.parse(messages) : [];
    } catch (error) {
      console.error('Error reading messages:', error);
      return [];
    }
  }

  static getUnreadMessages(): ContactMessage[] {
    return this.getAllMessages().filter(msg => msg.status === 'unread');
  }

  static markAsRead(messageId: string): void {
    const messages = this.getAllMessages();
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex !== -1) {
      messages[messageIndex].status = 'read';
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
    }
  }

  static deleteMessage(messageId: string): void {
    const messages = this.getAllMessages();
    const filteredMessages = messages.filter(msg => msg.id !== messageId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredMessages));
  }

  static exportMessages(): string {
    const messages = this.getAllMessages();
    return JSON.stringify(messages, null, 2);
  }

  static getMessageStats() {
    const messages = this.getAllMessages();
    return {
      total: messages.length,
      unread: messages.filter(msg => msg.status === 'unread').length,
      read: messages.filter(msg => msg.status === 'read').length,
      today: messages.filter(msg => {
        const msgDate = new Date(msg.timestamp);
        const today = new Date();
        return msgDate.toDateString() === today.toDateString();
      }).length,
    };
  }

  private static saveToBackup(message: ContactMessage): void {
    try {
      // Save to session storage as additional backup
      const sessionMessages = JSON.parse(sessionStorage.getItem('portfolio_messages_backup') || '[]');
      sessionMessages.push(message);
      sessionStorage.setItem('portfolio_messages_backup', JSON.stringify(sessionMessages));
    } catch (error) {
      console.warn('Failed to save backup:', error);
    }
  }
}
