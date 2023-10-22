// src/app/animations.ts

import { trigger, transition, style, animate } from '@angular/animations';

export const slideInLeftAnimation = trigger('slideInLeftAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
  ]),
]);

export const slideInRightAnimation = trigger('slideInRightAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
  ]),
]);
// -----------------------------------------------------------------------------------
export const slideInLeftAnimationBack = trigger('slideInLeftAnimationBack', [
  transition(':enter', [
    style({ transform: 'translateX(-20%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
  ]),
]);

export const slideInRightAnimationBack = trigger('slideInRightAnimationBack', [
  transition(':enter', [
    style({ transform: 'translateX(20%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
  ]),
]);

// -----------------------------------------------------------------------------------
export const slideOutLeftAnimation = trigger('slideOutLeftAnimation', [
  transition(':leave', [
    style({ transform: 'translateX(0%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' })),
  ]),
]);

export const slideOutRightAnimation = trigger('slideOutRightAnimation', [
  transition(':leave', [
    style({ transform: 'translateX(0%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' })),
  ]),
]);
