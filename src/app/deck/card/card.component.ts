import {Component, Input, OnInit} from '@angular/core';
import {CardInterface} from "../../_interface/card.interface";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  @Input()
  card: CardInterface|null = null;


  ngOnInit() {
    console.log(this.card);
  }

  zoomCard(card: CardInterface): void {
    const body = document.body;
    const overlay = document.createElement('div');
    const zoomedCard = document.createElement('div');

    // Prevent scrolling behind the overlay
    body.style.overflow = 'hidden';

    // Set up overlay styles
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.cursor = 'pointer';

    // Set up zoomed card styles
    zoomedCard.style.width = '80vw';
    zoomedCard.style.height = '80vh';
    zoomedCard.style.backgroundImage = `url(/${card.cardFront.url})`;
    zoomedCard.style.backgroundSize = 'contain';
    zoomedCard.style.backgroundPosition = 'center';
    zoomedCard.style.backgroundRepeat = 'no-repeat';
    // zoomedCard.style.borderRadius = '10px';
    zoomedCard.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
    zoomedCard.style.perspective = '1000px';

    // Hover effect (simulate card transformation on mousemove)
    zoomedCard.style.transformStyle = 'preserve-3d';
    zoomedCard.addEventListener('mousemove', (event) => {
      const rect = zoomedCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5; // Normalize X coordinate
      const y = (event.clientY - rect.top) / rect.height - 0.5; // Normalize Y coordinate
      const tiltX = y * 20; // Adjust tilting effect
      const tiltY = x * -20; // Adjust tilting effect

      // Create or update the white circle
      let mouseCircle = zoomedCard.querySelector('.mouse-circle') as HTMLDivElement;
      if (!mouseCircle) {
        mouseCircle = document.createElement('div');
        mouseCircle.classList.add('mouse-circle');
        mouseCircle.style.position = 'absolute';
        mouseCircle.style.width = '80px'; // Increased size for a more diffused effect
        mouseCircle.style.height = '80px'; // Increased size for a more diffused effect
        mouseCircle.style.borderRadius = '50%';
        mouseCircle.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; // Reduced opacity for a softer look
        mouseCircle.style.filter = 'blur(20px)'; // Added blur effect
        mouseCircle.style.pointerEvents = 'none';
        zoomedCard.appendChild(mouseCircle);
      }
      mouseCircle.style.left = `${event.clientX - rect.left - 40}px`; // Center the circle on mouse
      mouseCircle.style.top = `${event.clientY - rect.top - 40}px`; // Center the circle on mouse

      zoomedCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.0)`;
    });

    zoomedCard.addEventListener('touchmove', (event) => {
      const rect = zoomedCard.getBoundingClientRect();
      const touch = event.touches[0];
      const x = touch.clientX - rect.left; // X coordinate on the card
      const y = touch.clientY - rect.top; // Y coordinate on the card

      // Create or update the white circle
      let touchCircle = zoomedCard.querySelector('.touch-circle') as HTMLDivElement;
      if (!touchCircle) {
        touchCircle = document.createElement('div');
        touchCircle.classList.add('touch-circle');
        touchCircle.style.position = 'absolute';
        touchCircle.style.width = '80px'; // Increased size for a more diffused effect
        touchCircle.style.height = '80px'; // Increased size for a more diffused effect
        touchCircle.style.borderRadius = '50%';
        touchCircle.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; // Reduced opacity for a softer look
        touchCircle.style.filter = 'blur(20px)'; // Added blur effect
        touchCircle.style.pointerEvents = 'none';
        zoomedCard.appendChild(touchCircle);
      }
      touchCircle.style.left = `${x - 40}px`; // Center the circle on touch
      touchCircle.style.top = `${y - 40}px`; // Center the circle on touch

      const normalizedX = (x / rect.width) - 0.5; // Normalize X coordinate
      const normalizedY = (y / rect.height) - 0.5; // Normalize Y coordinate
      const tiltX = normalizedY * 60; // Further boosted tilting effect
      const tiltY = normalizedX * -60; // Further boosted tilting effect
      zoomedCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.0)`;
    });

    zoomedCard.addEventListener('mouseleave', () => {
      zoomedCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      zoomedCard.style.boxShadow = 'none';
    });

    zoomedCard.addEventListener('touchend', () => {
      zoomedCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      zoomedCard.style.boxShadow = 'none';
    });

    // Append zoomed card to overlay
    overlay.appendChild(zoomedCard);

    // Add overlay to body
    body.appendChild(overlay);

    // Remove overlay on click
    overlay.addEventListener('click', () => {
      body.style.overflow = ''; // Re-enable scrolling when overlay is removed
      body.removeChild(overlay);
    });
  }
}
