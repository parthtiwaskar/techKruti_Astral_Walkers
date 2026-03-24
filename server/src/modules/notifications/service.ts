import { Notification } from '../../shared/contracts/types';
import { NotificationRepository, notificationRepository } from './repository';
import { TriggerNotificationRequest } from './types';
import { generateId } from './utils';

export class NotificationService {
  constructor(private repo: NotificationRepository) {}

  public getForStudent(studentId: string): Notification[] {
    // Sort by createdAt descending
    return this.repo.getAllForStudent(studentId).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public triggerEvent(request: TriggerNotificationRequest): Notification {
    const newNotification: Notification = {
      id: generateId(),
      studentId: request.studentId,
      message: request.message,
      type: request.type,
      createdAt: new Date().toISOString(),
      read: false
    };
    return this.repo.create(newNotification);
  }
}

export const notificationService = new NotificationService(notificationRepository);
