import {  Component, Input } from '@angular/core';
import { Project } from '../interface/project';

@Component({
  selector: 'app-project-card',
  standalone:true,
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {

  @Input() project!: Project;
  @Input() showArrow: boolean = false;

}
