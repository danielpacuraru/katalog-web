import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProjectService } from '../../_services/project.service';
import { Project } from '../../_models/project';

@Component({
  selector: 'add-project-modal',
  templateUrl: './add-project-modal.component.html'
})
export class AddProjectModalComponent {

  public show: boolean = false;
  public form: FormGroup;
  public loading: boolean = false;

  @Output()
  create = new EventEmitter<Project>();

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  open(): void {
    this.show = true;
  }

  submit(): void {
    this.loading = true;
    this.form.markAllAsTouched();

    if(this.form.invalid) {
      this.loading = false;
      return;
    }

    this.projectService
      .create(this.form.value.name)
      .subscribe((project: Project) => {
        this.create.emit(project);
        this.loading = false;
        this.show = false;
      });
  }

  close(): void {
    this.show = false;
  }

}
