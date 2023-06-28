import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  formdata: any;
  projects: any;
  employees: any;
  id: any;

  constructor(private api: ApiService) {
    
  }

  Load() {
    this.id = null;
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(),
      description: new FormControl(),
      startdate: new FormControl(),
      targetdate: new FormControl(),
      managerid: new FormControl(0)
    })

    this.api.get("projects/listproject").subscribe((result) => {
      this.projects = result;
    })

    this.api.get("employees").subscribe((result) => {
      this.employees = result;
    })
  }

  ngOnInit(): void {
    
    this.Load();
  }

  Edit(id: number) {
    if (id != null) {
      this.api.get("projects/" + id).subscribe((result: any) => {
        this.formdata.patchValue({
          id: id,
          name: result.name,
          description: result.description,
          startdate: result.startdate,
          targetdate: result.targetdate,
          managerid: result.managerid
        })
      })
      this.id = id;

    }
  }


  Save(data: any) {
    console.log(data);
    if (this.id == null) {
      this.api.post("projects", data).subscribe((result: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Project Module added successfully 👍',
          showConfirmButton: false,
          timer: 1500
        })
        this.Load();
      })
    }
    else{
      this.api.put("projects/" + this.id, data).subscribe((result:any)=>{
          console.log(result);
          this.Load();
      })
    }
  }

  Delete(id: number) {
    if (confirm("Sure to delete")) {
      this.api.delete("projects/" + id).subscribe((result: any) => {
        console.log(result);
        this.Load();
      })
    }
  }

}
