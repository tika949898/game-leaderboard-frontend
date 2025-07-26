
import { forwardRef } from 'react';

interface Props {
  announcement: string;
}

const AnnouncementRegion = forwardRef<HTMLDivElement, Props>(({ announcement }, ref) => (
  <div
    aria-live="assertive"
    aria-atomic="true"
    className="sr-only"
    role="status"
    id="submission-announcement"
    tabIndex={0}
    ref={ref}
  >
    {announcement}
  </div>
));

AnnouncementRegion.displayName = 'AnnouncementRegion';

export default AnnouncementRegion;
