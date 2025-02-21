export interface iEvent {
  id: number;
  title: string;
  description: string;
  eventDate: string; // Può essere un Date se vuoi gestirlo diversamente
  location: string;
  availableSeats: number;
  organizerId: number;
  organizerUsername: string;
}
