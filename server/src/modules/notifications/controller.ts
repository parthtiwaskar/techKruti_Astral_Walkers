import { Request, Response } from 'express';
import { notificationService } from './service';
import { ApiResponse } from '../../shared/contracts/api';

export class NotificationController {
  public getStudentNotifications = (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
      const notifications = notificationService.getForStudent(studentId as string);
      res.json({ success: true, data: notifications } as ApiResponse);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export const notificationController = new NotificationController();
