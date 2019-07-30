import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  showSpinner=false;
  showButton=true;

  url:string = 'api/skills';

  color:string = 'black';

  onLike(card : any){
    this.showButton=false;
    this.showSpinner=true;
    setTimeout(() => {
      this.showButton=true;
      this.showSpinner=false;
    }, 5000);

    card.likes++;
    this.color = this.getColor(card);
    this.http.put(this.url+'/'+card.id , card
      ).subscribe(data => {
      console.log(data);
    }
    )

    // TODO: incrementar o like, salvar via rest
  }
  getColor(card:any){
    if(card.likes<5)
      return 'black';
    else if(card.likes>=5 && card.likes<10)
      return 'blue';
    else 
      return 'green';
  }

  onShare(card: any){
    // TODO: abrir o link do seu linkedin
    window.location.href='https://www.linkedin.com/in/douglasgomes209/';
  }

}
