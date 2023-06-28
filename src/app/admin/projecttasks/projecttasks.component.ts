import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-projecttasks',
  templateUrl: './projecttasks.component.html',
  styleUrls: ['./projecttasks.component.css']
})
export class ProjecttasksComponent implements OnInit {

  formdata: any;
  moduleid: any;
  tasks: any;
  project: any;
  module: any;
  projectid: any;
  employeeid: any;
  id: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.moduleid = route.snapshot.paramMap.get("moduleid")
    this.projectid = route.snapshot.paramMap.get("projectid")
    this.employeeid = route.snapshot.paramMap.get("managerid")
  }
  ngOnInit(): void {
    this.Load();

  }

  Load() {

    this.api.get("projecttasks/listtasks/" + this.moduleid).subscribe((result: any) => {
      console.log(result);

      this.tasks = result;
    })

    this.api.get("projectmodules/" + this.moduleid).subscribe((result: any) => {
      this.module = result;

      console.log(this.module.projectid);

    })
    this.api.get("projects/" + this.projectid).subscribe((result: any) => {
      this.project = result;

    })

    this.formdata = new FormGroup({
      id: new FormControl(0),
      projectid: new FormControl(this.projectid),
      moduleid: new FormControl(this.moduleid),
      task: new FormControl(),
      description: new FormControl(),
      employeeid: new FormControl(this.employeeid),
      startdate: new FormControl(),
      enddate: new FormControl(),
      starttime: new FormControl(),
      endtime: new FormControl(),
      duration: new FormControl(),
      status: new FormControl(),
    })


  }

  Edit(id: number) {
    if (id != null) {
      this.api.get("projecttasks/" + id).subscribe((result: any) => {
        this.formdata.patchValue({
          id: id,
          projectid: result.projectid,
          moduleid: result.moduleid,
          task: result.task,
          description: result.description,
          employeeid: result.employeeid,
          startdate: result.startdate,
          enddate: result.enddate,
          starttime: result.starttime,
          endtime: result.endtime,
          duration: result.duration,
          status: result.status
        })
      })
      this.id = id;
    }
  }

  Save(data: any) {
    console.log(data);
    if (this.id == null) {
      this.api.post("projecttasks", data).subscribe((result: any) => {
        this.Load();
      })
    }
    else {
      this.api.put("projecttasks/" + this.id, data).subscribe((result: any) => {
        this.Load();
      })
    }
  }

  Delete(id: number) {
    if (confirm("Are you sure to delete")) {
      this.api.delete("projecttasks/" + id).subscribe((result: any) => {
        this.Load();
      })
    }
  }

}
