/* Single source for names, links and the form endpoint. */

export type NavKey = 'home' | 'services' | 'approach' | 'about' | 'contact';

export interface Social {
  label: 'Instagram' | 'Threads' | 'YouTube' | 'LinkedIn';
  href: string;
  handle: string;
}

export const site = {
  name: 'Donyell Kennedy-McCullough',
  titleLine: 'Former SVP, Artist & Talent Relations Strategy and Casting',
  location: 'Los Angeles',

  /* Formspree form ID (the part after https://formspree.io/f/). James creates
     the form in his Formspree account and sets the destination email there.
     Empty = the contact form renders a "not connected yet" notice instead of
     pretending to send. */
  formspreeId: 'mrpqboyz',

  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/donyellkennedymccullough/', handle: '@donyellkennedymccullough' },
    { label: 'Threads', href: 'https://www.threads.com/@donyellkennedymccullough', handle: '@donyellkennedymccullough' },
    /* Clean channel URL — the copy on her Instagram is wrapped in an
       l.instagram.com redirect carrying fbclid tracking. */
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCKr3zXboSlu9wY_KjiIr4dA', handle: 'Channel' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/donyellkennedymccullough/', handle: 'Donyell Kennedy-McCullough' },
  ] satisfies Social[],

  nav: [
    { key: 'services', href: '/services/', label: 'Services' },
    { key: 'approach', href: '/approach/', label: 'Approach' },
    { key: 'about', href: '/about/', label: 'About' },
    { key: 'contact', href: '/contact/', label: 'Contact' },
  ] satisfies { key: NavKey; href: string; label: string }[],
};
