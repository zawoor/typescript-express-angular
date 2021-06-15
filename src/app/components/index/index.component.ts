import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../interfaces/customer.interface';
@Component({
    selector: 'app-posts',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class PostsComponent implements OnInit {

    customers: Customer[] = [];

    constructor(private postsService: ApiService) { }

    ngOnInit(): void {
        this.postsService.getAll()
            .subscribe(
                data => {
                    this.customers = data;
                },
                error => {
                    console.log(error);
                });
    }
}
