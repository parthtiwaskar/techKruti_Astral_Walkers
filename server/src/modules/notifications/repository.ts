import { Notification } from '../../shared/contracts/types';

export class NotificationRepository {
  private notifications: Notification[] = [];

  public getAllForStudent(studentId: string): Notification[] {
    return this.notifications.filter(n => n.studentId === studentId);
  }

  public create(notification: Notification): Notification {
    this.notifications.push(notification);
    return notification;
  }
}

export const notificationRepository = new NotificationRepository();
