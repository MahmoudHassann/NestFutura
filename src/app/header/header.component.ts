import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { PredictiveSearchComponent } from '../predictive-search/predictive-search.component';

export interface SubmenuItem {
  href: string; // Link URL
  iconAlt: string; // Icon alt text
  title: string; // Title of the submenu
  description: string; // Description of the submenu
}
export interface Solutions {
  href: string; // Link URL
  imgSrc: string; // Icon image source
  imgAlt: string; // Icon alt text
  title: string; // Title of the submenu
  description: string; // Description of the submenu
}
export interface NavItem {
  href: string; // Link URL
  title: string; // Title of the nav item
}


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,PredictiveSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  drawerOpen: boolean = false;
  predictiveSearch: boolean = false;
  navItems: NavItem[] = [];
  techItems: NavItem[] = [];
  submenuItems: SubmenuItem[] = [];
  Smart_Energy: Solutions[] = [];
  Guide: Solutions[] = [];
  newProducts: NavItem[] = [];
  solutions_smart_home: NavItem[] = [];
  solutions_Smart_Building: NavItem[] = [];
  solutions_Use_cases: NavItem[] = [];
  support: NavItem[] = [];
  resources: NavItem[] = [];
  knowledge_base: NavItem[] = [];

  constructor(private eRef: ElementRef) {

  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Check if the click occurred outside the component
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.predictiveSearch = false;
    }
  }
  ngOnInit(): void {
    this.Smart_Energy = [
      {
        href: '/smart-lighting',
        imgSrc: 'https://www.shelly.com/cdn/shop/files/solutions-1_80x.jpg?v=1724848094',
        imgAlt: 'Smart Lighting Icon',
        title: 'Professional smart energy  control & monitoring',
        description: 'Optimize and track your energy usage with precision',
      },
      {
        href: '/smart-lighting',
        imgSrc: 'https://www.shelly.com/cdn/shop/files/solutions-2_80x.jpg?v=1724848093',
        imgAlt: 'Smart Lighting Icon',
        title: 'PV Solutions / Industrial',
        description: 'For your solar solutions or other industrial applications',
      },
      {
        href: '/smart-lighting',
        imgSrc: 'https://www.shelly.com/cdn/shop/files/solutions-3_80x.jpg?v=1724848093',
        imgAlt: 'Smart Lighting Icon',
        title: 'Energy efficient home',
        description: 'Create a sustainable and cost-effective smart home',
      },
    ]

    this.Guide = [
      {
        href: '/smart-lighting',
        imgSrc: 'https://www.shelly.com/cdn/shop/files/help-1_80x.jpg?v=1724853957',
        imgAlt: 'Smart Lighting Icon',
        title: 'Customer projects',
        description: 'Discover innovative ideas and get inspiration from other Shelly users',
      },
      {
        href: '/smart-lighting',
        imgSrc: 'https://www.shelly.com/cdn/shop/files/help-3_80x.jpg?v=1724853957',
        imgAlt: 'Smart Lighting Icon',
        title: 'Shelly Academy',
        description: 'The ultimate academy to learn scripting basics',
      },
      {
        href: '/smart-lighting',
        imgSrc: 'https://www.shelly.com/cdn/shop/files/Smart-Home-Guide-menu-asset_80x.jpg?v=1734388259',
        imgAlt: 'Smart Lighting Icon',
        title: 'Smart Home Guide',
        description: 'Learn how and with which products you can transform your space into a Smart Home.',
      },
    ]


    this.submenuItems = [
      {
        href: '/smart-lighting',
        iconAlt: 'Smart Lighting Icon',
        title: 'Smart Lighting',
        description: 'Make your lights smart and control them from anywhere, easily and affordably',
      },
      {
        href: '/smart-sensors',
        iconAlt: 'Smart Sensors Icon',
        title: 'Smart doors, gates, roller covers & blinds',
        description: 'Automate your garage doors and gates for comfort and security. Control your blinds and shades from anywhere.',
      },
      {
        href: '/Monitor-energy',
        iconAlt: 'Smart Monitor Icon',
        title: 'Monitoring & Saving Energy',
        description: 'Track energy use in real-time and lower your costs by 40%.',
      },
      {
        href: '/Monitor-energy',
        iconAlt: 'Smart Heating Icon',
        title: 'Smart Heating & Climate Control',
        description: 'Automate your heating and cooling while minimizing energy waste',
      },
      {
        href: '/Monitor-energy',
        iconAlt: 'Smart safety Icon',
        title: 'Safety & Security',
        description: 'Keep your home safe with smart sensors and monitor it from anywhere.',
      },
    ]

    this.navItems = [
      {
        href: '/smart-lighting',
        title: 'Smart Switches and Dimmers',
      },
      {
        href: '/smart-switches',
        title: 'Smart Plugs',
      },
      {
        href: '/smart-switches',
        title: 'Smart Blubs',
      },
      {
        href: '/smart-switches',
        title: 'Sensons and Thermostats',
      },
      {
        href: '/smart-switches',
        title: 'Energy Meters',
      },
      {
        href: '/smart-switches',
        title: 'Profissional Devices',
      },
      {
        href: '/smart-switches',
        title: 'Accessories & Merchandise',
      },
    ]

    this.techItems = [
      {
        href: '/tech',
        title: 'Wi-Fi'
      },
      {
        href: '/tech',
        title: 'Bluetooth'
      },
      {
        href: '/tech',
        title: 'Z-wave'
      },
      {
        href: '/tech',
        title: 'LAN'
      },
      {
        href: '/tech',
        title: 'KNX/IP'
      },
    ]

    this.newProducts = [
      {
        href: '/tech',
        title: 'Z-wave'
      },
      {
        href: '/tech',
        title: 'LAN'
      },
    ]

    this.solutions_smart_home = [
      {
        href: '/tech',
        title: 'Retrofit & Existing Home'
      },
      {
        href: '/tech',
        title: 'New smart home'
      },
      {
        href: '/tech',
        title: 'Outdoor'
      },
    ]

    this.solutions_Smart_Building = [
      {
        href: '/tech',
        title: 'Office'
      },
      {
        href: '/tech',
        title: 'Restaurants'
      },
      {
        href: '/tech',
        title: 'Hotels'
      },
    ]

    this.solutions_Use_cases = [
      {
        href: '/tech',
        title: 'Energy efficient building'
      },
      {
        href: '/tech',
        title: 'Smart lighting'
      },
      {
        href: '/tech',
        title: 'Smart comfort & Automation'
      },
      {
        href: '/tech',
        title: 'Smart Safety & Security'
      },
    ]
    this.support = [
      {
        href: '/tech',
        title: 'Open a support ticket'
      },
      {
        href: '/tech',
        title: 'Shelly Community Forum'
      },
      {
        href: '/tech',
        title: 'Shelly Facebook Group'
      },
      {
        href: '/tech',
        title: 'FAQ'
      },
    ]
    this.resources = [
      {
        href: '/tech',
        title: 'Blog'
      },
      {
        href: '/tech',
        title: 'Media center'
      },
      {
        href: '/tech',
        title: 'Media kit'
      },
    ]
    this.knowledge_base = [
      {
        href: '/tech',
        title: 'Installation videos'
      },
      {
        href: '/tech',
        title: 'KB documentation'
      },
      {
        href: '/tech',
        title: 'Product Catalog'
      },
      {
        href: '/tech',
        title: 'Developers API'
      },
      {
        href: '/tech',
        title: 'Scripts Knowledge Base'
      },
      {
        href: '/tech',
        title: 'Shelly Device Finder'
      },
    ]

  }





  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleSearch(){
    this.predictiveSearch = !this.predictiveSearch
  }

  handleMobileMenuClick(event: Event) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    const parentContainer = target.closest('.nav-item-container');
    
    if (!parentContainer) return;

    // Handle menu open click
    if (target.classList.contains('menu-mobile-open')) {
      // Remove active class from all other menus
      const allMenus = document.querySelectorAll('.menu-mobile-open.active');
      allMenus.forEach(menu => menu.classList.remove('active'));
      
      // Add active class to clicked menu
      target.classList.add('active');

      // Find and activate the corresponding megamenu/dropdown
      const megaMenu = parentContainer.querySelector('.nav-item-megamenu');
      const dropdownMenu = parentContainer.querySelector('.nav-item-dropdown-link-container');
      
      if (megaMenu) {
        // Deactivate all other megamenus
        const allMegaMenus = document.querySelectorAll('.nav-item-megamenu.active');
        allMegaMenus.forEach(menu => menu.classList.remove('active'));
        
        megaMenu.classList.add('active');
      }
      
      if (dropdownMenu) {
        // Deactivate all other dropdowns
        const allDropdowns = document.querySelectorAll('.nav-item-dropdown-link-container.active');
        allDropdowns.forEach(menu => menu.classList.remove('active'));
        
        dropdownMenu.classList.add('active');
      }
    }

    // Handle menu close click
    if (target.classList.contains('menu-mobile-close')) {
      // Find and remove active class from parent megamenu/dropdown
      const megaMenu = parentContainer.querySelector('.nav-item-megamenu');
      const dropdownMenu = parentContainer.querySelector('.nav-item-dropdown-link-container');
      
      if (megaMenu) {
        megaMenu.classList.remove('active');
      }
      
      if (dropdownMenu) {
        dropdownMenu.classList.remove('active');
      }

      // Remove active class from corresponding open button
      const openButton = parentContainer.querySelector('.menu-mobile-open');
      if (openButton) {
        openButton.classList.remove('active');
      }
    }
  }
}
