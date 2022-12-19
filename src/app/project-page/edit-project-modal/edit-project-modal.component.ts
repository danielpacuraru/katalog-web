import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProjectService } from '../../_services/project.service';
import { Project } from '../../_models/project';

@Component({
  selector: 'edit-project-modal',
  templateUrl: './edit-project-modal.component.html'
})
export class EditProjectModalComponent {
  public show: boolean = false;
  public loading: boolean = false;
  public name: string;
  public docsFormat: string;
  public showManuals: boolean;

  @Input()
  public projectId: string;

  @Output()
  private update = new EventEmitter<Project>();

  constructor(
    private projectService: ProjectService
  ) { }

  public open(project: Project): void {
    this.name = project.name;
    this.docsFormat = project.options.docsFormat;
    this.showManuals = project.options.showManuals;

    this.show = true;
    this.loading = false;
  }

  public submit(): void {
    this.loading = true;

    const obj = {
      name: this.name,
      options: {
        docsFormat: this.docsFormat,
        showManuals: this.showManuals
      }
    }

    this.projectService
      .update(obj, this.projectId)
      .subscribe((project: Project) => {
        this.close();
        this.update.emit(project);
      });
  }

  public close(): void {
    this.show = false;
    this.loading = false;
  }

}
