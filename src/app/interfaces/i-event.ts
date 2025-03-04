export interface iEvent {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  organizerId: number;
  organizerUsername: string;
  ticketLink?: string;
  category: string;
}
