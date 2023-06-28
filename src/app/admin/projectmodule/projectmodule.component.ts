import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projectmodule',
  templateUrl: './projectmodule.component.html',
  styleUrls: ['./projectmodule.component.css']
})
export class ProjectmoduleComponent implements OnInit {

  formdata:any;
  modules:any
  modulename:any
  id:any;
  project:any;
  projectsid:any;

  constructor(private api:ApiService, private router:ActivatedRoute){
    this.projectsid = router.snapshot.paramMap.get("projectid")
  }
  ngOnInit(): void {
    this.api.get("projects/" + this.projectsid).subscribe((result:any)=>{
      this.project = result;
    })
    this.Load();
  }
  Load(){
    
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(),
      projectid: new FormControl(this.projectsid)
    })

    this.api.get("projectmodules/listmodules/"+ this.projectsid).subscribe((result:any)=>{
      this.modules = result;
    })
  }

  Edit(id:number){
    if (id != null) {

      this.api.get("projectmodules/" + id ).subscribe((result: any) => {
        this.formdata.patchValue({
          id: id,
          name: result.name,
          projectid: result.projectid
        })
      })
      this.id = id;

    }
  }

  Save(data:any){
    console.log(data);
    if(this.id == null){

      this.api.post("projectmodules", data).subscribe((result:any)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Project Module added successfully 👍',
          showConfirmButton: false,
          timer: 1500
        })
        this.Load() ;
      })
  }
  else{

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.put("projectmodules/" + this.id, data).subscribe((result:any)=>{
          Swal.fire('Saved!', '', 'success')
          this.Load();
        })
        
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }
}

  Delete(id:number){
    // if (confirm("Sure to delete")) {
    
    // }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("projectmodules/" + id).subscribe((result: any) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.Load();
        })
        
        
      }
    })
  }

}
