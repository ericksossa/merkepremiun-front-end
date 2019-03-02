import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customersService.allCustomers()
      .subscribe(resp => {
        this.customers = resp.data;
        console.log(resp);
      });
  }

  onSave(client: any) {
    this.customersService.updateDiscount(client.id, client)
      .subscribe(resp => {
        // bien
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000
        });
        Toast.fire({
          type: 'success',
          title: `${resp.message}`,
        });

      }, err => {
        // error
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000
        });
        Toast.fire({
          type: 'error',
          title: `${err.error.message}`,
        });
      });

  }


}
