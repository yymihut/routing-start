import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id']; //punem + si rezultatul e tratat ca si numar nu ca string
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((par: Params) => {
      this.server = this.serversService.getServer(+par['id']); //updateaza si linkul dupa ce se schimba pagina
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve', //preserve - pastreaza ultima informatie, face update
    });
    console.log('app-server', this.server.id);
    console.log('app-server', this.route.queryParams);
  }
}
