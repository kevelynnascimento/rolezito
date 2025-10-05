export class NotificationResponseDto {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  userId: string;
  createdAt: Date;
}

export class MarkAsReadResponseDto {
  message: string;
}